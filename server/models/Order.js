const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }],
    subjects: [
        {
            subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
            name: String,
            price: Number,
            pdfUrl: String,
        }
    ],
    amount: Number,
    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,
    status: { type: String, enum: ["paid", "pending"], default: "pending" },
});

module.exports = mongoose.model("Order", OrderSchema);
