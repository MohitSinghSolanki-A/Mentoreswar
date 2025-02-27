const Razorpay = require("razorpay");
const Order = require("../models/Order");
const Product = require("../models/Product"); // Import Product model
const crypto = require("crypto");
require("dotenv").config();

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("❌ Missing Razorpay API keys in environment variables");
}

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
    try {
        const { productIds, userId } = req.body;

        if (!Array.isArray(productIds) || productIds.length === 0) {
            return res.status(400).json({ success: false, message: "No products selected" });
        }

        const products = await Product.find({ _id: { $in: productIds } }).lean();

        if (products.length !== productIds.length) {
            return res.status(404).json({ success: false, message: "One or more products not found" });
        }

        let totalAmount = req.body.amount;

        // ✅ Apply 10% discount for multiple products
        if (products.length > 1) {
            totalAmount *= 0.9; // 10% discount
        }

        const amountInPaise = Math.round(totalAmount * 100);

        // 🔹 Create Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount: amountInPaise,
            currency: "INR",
            receipt: `order_${Date.now()}`,
            notes: { userId, productIds: JSON.stringify(productIds) },
        });

        // 🔹 Save order to database
        const newOrder = new Order({
            userId,
            productIds,
            amount: amountInPaise, // Store amount in paise for consistency
            razorpay_order_id: razorpayOrder.id,
            status: "pending",
        });

        await newOrder.save();

        res.json({
            success: true,
            message: "Order created successfully",
            orderId: razorpayOrder.id,
            amount: totalAmount, // Return amount in rupees for frontend
            currency: "INR",
        });
    } catch (error) {
        console.error("❌ Order creation error:", error);
        res.status(500).json({ success: false, message: "Error creating order" });
    }
};

// ✅ **Verify Payment**
exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // 🔹 Validate required fields
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ success: false, message: "Missing payment details" });
        }

        // 🔹 Fetch the order from the database
        const order = await Order.findOne({ razorpay_order_id });

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // 🔹 Prevent re-verification of already paid orders
        if (order.status === "paid") {
            return res.status(200).json({ success: true, message: "Order already verified", verified: true });
        }

        // 🔹 Verify payment signature using HMAC SHA256
        const hmac = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (hmac !== razorpay_signature) {
            order.status = "failed";
            await order.save();
            return res.status(400).json({ success: false, message: "Invalid payment signature" });
        }

        // 🔹 Update order status as 'paid' in database
        order.status = "paid";
        order.razorpay_payment_id = razorpay_payment_id;
        order.razorpay_signature = razorpay_signature;
        await order.save();

        res.json({ success: true, message: "Payment verified successfully", verified: true });
    } catch (error) {
        console.error("❌ Payment verification error:", error);
        res.status(500).json({ success: false, message: "Error verifying payment" });
    }
};
