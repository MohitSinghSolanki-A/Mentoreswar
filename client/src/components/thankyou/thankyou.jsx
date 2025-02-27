import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ThankYou.css";

const ThankYou = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const purchasedCourses = JSON.parse(localStorage.getItem("purchasedCourses")) || [];
        setCourses(purchasedCourses);
    }, []);

    return (
        <div className="thank-you-container">
            <h1>🎉 Thank You for Your Purchase!</h1>
            <p>You have successfully purchased the following courses:</p>

            <div className="course-list">
                {courses.length > 0 ? (
                    courses.map((course, index) => (
                        <div key={index} className="course-item">
                            <h3>{course.title}</h3>
                            <p>{course.description}</p>
                            <ul>
                                {course.subjects.map((subject, i) => (
                                    <li key={i}>{subject.name} - ₹{subject.price}</li>
                                ))}
                            </ul>
                            <h4>Total: ₹{course.totalAmount}</h4>
                        </div>
                    ))
                ) : (
                    <p>No purchased courses found.</p>
                )}
            </div>

            <div className="buttons">
                <button className="btn btn-home" onClick={() => navigate("/")}>🏠 Go to Home</button>
                <button className="btn" onClick={() => navigate("/products")}>📚 Buy More Courses</button>
            </div>
        </div>
    );
};

export default ThankYou;
