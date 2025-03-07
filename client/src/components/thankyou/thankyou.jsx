import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./thankyou.css";

const ThankYou = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Load purchased courses
        const purchasedCourses = JSON.parse(localStorage.getItem("purchasedCourses")) || [];
        setCourses(purchasedCourses);

        // Redirect to home after 10 seconds
        const timer = setTimeout(() => {
            navigate("/");
        }, 10000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="home">
            <div className="thankyou-container">
                <div className="thankyou-card">
                    <div className="success-checkmark">
                        <div className="check-icon">
                            <span className="icon-line line-tip"></span>
                            <span className="icon-line line-long"></span>
                            <div className="icon-circle"></div>
                            <div className="icon-fix"></div>
                        </div>
                    </div>

                    <h1>Thank You!</h1>
                    <p>Your purchase was successful</p>

                    <div className="course-list">
                        {courses.length > 0 ? (
                            courses.map((course, index) => (
                                <div key={index} className="course-item">
                                    <h3>{course.title}</h3>
                                    <p>{course.description}</p>
                                    <ul>
                                        {course.subjects.map((subject, i) => (
                                            <li key={i}>
                                                {subject.name} - ₹{subject.price}
                                            </li>
                                        ))}
                                    </ul>
                                    <h4>Total: ₹{course.totalAmount}</h4>
                                </div>
                            ))
                        ) : (
                            <p className="order-details">
                                An email with your order details has been sent to your registered email address.
                            </p>
                        )}
                    </div>

                    <div className="redirect-message">
                        You will be redirected to the home page in a few seconds
                    </div>

                    <div className="buttons">
                        <button className="home-btn" onClick={() => navigate("/")}>
                            Return to Home
                        </button>
                        <button className="courses-btn" onClick={() => navigate("/products")}>
                            Buy More Courses
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThankYou;