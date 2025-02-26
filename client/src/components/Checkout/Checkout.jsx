import { useState } from "react";
import "./Checkout.css";

const Checkout = ({ products }) => {
    const [selectedCourses, setSelectedCourses] = useState([]);

    const handleSelect = (id) => {
        setSelectedCourses((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
        );
    };

    const calculateTotal = () => {
        let total = selectedCourses.reduce(
            (sum, id) => sum + products.find((p) => p.id === id).price,
            0
        );
        return selectedCourses.length > 1 ? (total * 0.9).toFixed(2) : total.toFixed(2);
    };

    const handlePayment = async () => {
        if (!selectedCourses.length) return alert("Select at least one course!");

        const response = await fetch("/api/payment/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
            body: JSON.stringify({ productIds: selectedCourses, amount: calculateTotal() }),
        });

        const data = await response.json();
        if (data.orderId) handleRazorpay(data.orderId, data.amount);
    };

    const handleRazorpay = (orderId, amount) => {
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: amount * 100,
            currency: "INR",
            order_id: orderId,
            handler: async (response) => {
                await fetch("/api/payment/verify-payment", {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
                    body: JSON.stringify(response),
                });
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="checkout-container">
            <div className="checkout-box">
                <h2>Select Your Courses</h2>
                {products.map((p) => (
                    <div key={p.id} className={`course-item ${selectedCourses.includes(p.id) ? "selected" : ""}`} onClick={() => handleSelect(p.id)}>
                        <input type="checkbox" checked={selectedCourses.includes(p.id)} onChange={() => handleSelect(p.id)} />
                        {p.title} - ₹{p.price}
                    </div>
                ))}
                <div className="total-price">
                    <span>Total:</span>
                    <span>₹{calculateTotal()}</span>
                </div>
                <button className="pay-btn" onClick={handlePayment}>Buy Now</button>
            </div>
        </div>
    );
};

export default Checkout;
