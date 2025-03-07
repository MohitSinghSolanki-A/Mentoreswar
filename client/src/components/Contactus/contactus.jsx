import React, { useState } from "react";
import axios from "axios";
import "./contactus.css";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/api/call/email", formData);
            setMessage(response.data.message);
            setFormData({ name: "", email: "", phone: "" });
        } catch (error) {
            setMessage("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="home">
            <div className="contact-container">
                <h2>Request a Callback</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                    <input type="tel" name="phone" placeholder="Your Phone" value={formData.phone} onChange={handleChange} required />
                    <button type="submit">Request a Call</button>
                </form>
                {message && <p className="response-message">{message}</p>}
            </div>
        </div>
    );
};

export default Contact;
