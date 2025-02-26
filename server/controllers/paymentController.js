const Razorpay = require("razorpay");
const Order = require("../models/Order");
const Product = require("../models/Product"); // Import Product model
const crypto = require("crypto");
require("dotenv").config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 🛒 Create an Order
exports.createOrder = async (req, res) => {
    try {
        const { productIds } = req.body;
        const userId = req?.user?.id; // Ensure userId is safely extracted

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        if (!Array.isArray(productIds) || productIds.length === 0) {
            return res.status(400).json({ message: "No products selected" });
        }

        // Fetch product details from MongoDB
        const products = await Product.find({ _id: { $in: productIds } });

        if (products.length !== productIds.length) {
            return res.status(404).json({ message: "One or more products not found" });
        }

        // Calculate total price dynamically
        let totalAmount = products.reduce((sum, product) => sum + product.price, 0);

        // Apply discount for multiple courses
        if (products.length > 1) {
            totalAmount *= 0.9; // 10% discount
        }

        // Convert to paise (smallest currency unit)
        const amountInPaise = Math.round(totalAmount * 100);

        // Create Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount: amountInPaise,
            currency: "INR",
            receipt: `order_${Date.now()}`,
            notes: { userId, productIds: JSON.stringify(productIds) },
        });

        // Save order to database
        const newOrder = new Order({
            userId,
            productIds,
            amount: totalAmount,
            razorpay_order_id: razorpayOrder.id,
            status: "pending",
        });

        await newOrder.save();

        res.json({ orderId: razorpayOrder.id, amount: totalAmount });
    } catch (error) {
        console.error("Order creation error:", error);
        res.status(500).json({ message: "Error creating order" });
    }
};


// ✅ Verify Payment
exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Validate required fields
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ message: "Missing payment details" });
        }

        const order = await Order.findOne({ razorpay_order_id });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Prevent re-verification of already paid orders
        if (order.status === "paid") {
            return res.status(200).json({ message: "Order already verified", verified: true });
        }

        // Verify payment signature
        const hmac = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (hmac !== razorpay_signature) {
            order.status = "failed";
            await order.save();
            return res.status(400).json({ message: "Invalid payment signature" });
        }

        // Update order status
        order.status = "paid";
        order.razorpay_payment_id = razorpay_payment_id;
        order.razorpay_signature = razorpay_signature;
        await order.save();

        res.json({ message: "Payment verified successfully", verified: true });
    } catch (error) {
        console.error("Payment verification error:", error);
        res.status(500).json({ message: "Error verifying payment" });
    }
};

