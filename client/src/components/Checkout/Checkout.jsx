import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";

const Checkout = () => {
    const navigate = useNavigate();
    const queryParameters = new URLSearchParams(window.location.search);
    const productId = queryParameters.get("productId");
    const selectedSubjects = queryParameters.get("subjects")?.split(",").map(s => s.trim()) || [];

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSubjectsData, setSelectedSubjectsData] = useState([]);
    const [error, setError] = useState(null);

    const API_BASE_URL = "http://localhost:3001";
    const RAZORPAY_KEY_ID = "rzp_test_uBkhaWV8gPaYLF";

    useEffect(() => {
        if (productId) {
            fetchProductDetails(productId);
        }
    }, [productId]);

    const fetchProductDetails = async (id) => {
        try {
            setLoading(true);
            setError(null);
            const { data } = await axios.get(`${API_BASE_URL}/api/products/${id}`);
            setProduct(data);
            setSelectedSubjectsData(data.subjects.filter(subject => selectedSubjects.includes(subject.name)));
        } catch (error) {
            console.error("Error fetching product:", error);
            setError("Failed to fetch product details. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const calculateTotalPrice = () => {
        return selectedSubjectsData.reduce((total, subject) => total + subject.price, 0);
    };

    const handlePayment = async () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
            alert("⚠️ Authentication required. Please log in.");
            return;
        }

        try {
            const { data } = await axios.post(
                `${API_BASE_URL}/api/payment/create-order`,
                {
                    userId,
                    productIds: [productId],
                    amount: calculateTotalPrice(),
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (data.orderId) {
                // Store course details in localStorage before payment
                const purchasedCourses = JSON.parse(localStorage.getItem("purchasedCourses")) || [];
                const newPurchase = {
                    productId: product._id,
                    title: product.title,
                    description: product.description,
                    subjects: selectedSubjectsData,
                    totalAmount: calculateTotalPrice(),
                };

                localStorage.setItem("purchasedCourses", JSON.stringify([...purchasedCourses, newPurchase]));

                // Proceed to payment
                handleRazorpay(data.orderId, data.amount, token);
            } else {
                alert("⚠️ Payment initiation failed. Please try again.");
            }
        } catch (error) {
            console.error("Payment Error:", error);
            alert("❌ Error processing payment. Please try again.");
        }
    };


    const handleRazorpay = (orderId, amount, token) => {
        if (!window.Razorpay) {
            alert("⚠️ Razorpay SDK failed to load. Please refresh and try again.");
            return;
        }
        const userId = localStorage.getItem("userId");

        const options = {
            key: RAZORPAY_KEY_ID,
            amount: amount * 100,
            currency: "INR",
            order_id: orderId,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(
                        `${API_BASE_URL}/api/payment/verify-payment`,
                        { ...response, userId },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );

                    if (data.success) {
                        console.log(data)
                        alert("✅ Payment successful! Thank you for your purchase.");
                        navigate("/thankyou");
                    } else {
                        alert("⚠️ Payment verification failed. Please contact support.");
                    }
                } catch (error) {
                    console.error("Verification Error:", error);
                    alert("❌ Error verifying payment. Please try again.");
                }
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="home">
            <div className="checkout-container">
                <div className="checkout-box">
                    <h2>Course Checkout</h2>
                    <div className="course-details">
                        {loading ? (
                            <p>Loading product details...</p>
                        ) : error ? (
                            <p className="error">❌ {error}</p>
                        ) : product ? (
                            <>
                                <h3>{product.title}</h3>
                                <p>{product.description}</p>
                                <h4>Selected Subjects:</h4>
                                <ul>
                                    {selectedSubjectsData.length > 0 ? (
                                        selectedSubjectsData.map(subject => (
                                            <li key={subject._id}>
                                                {subject.name} - ₹{subject.price}
                                            </li>
                                        ))
                                    ) : (
                                        <p>⚠️ No subjects selected.</p>
                                    )}
                                </ul>
                                <h3>Total: ₹{calculateTotalPrice()}</h3>
                            </>
                        ) : (
                            <p>❌ Product not found.</p>
                        )}
                        <button className="pay-btn" onClick={handlePayment} disabled={!product || loading || selectedSubjectsData.length === 0}>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;