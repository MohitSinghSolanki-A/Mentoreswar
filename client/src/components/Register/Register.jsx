import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";
import RegistrationForm from "../RegistrationForm";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.username, // ✅ Include username
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("🎉 Registration successful! Please login.", { position: "top-right" });
                setTimeout(() => navigate("/login"), 2000);
            } else {
                toast.error(`❌ ${data.error}`, { position: "top-right" });
            }
        } catch (error) {
            toast.error("❌ Something went wrong. Try again!", { position: "top-right" });
        }
    };


    return (
        <div className="home">
            <div className="register-container">
                <ToastContainer />
                <div className="register-form">
                    <h2 >Create an account</h2>
                    <p>Already have and account <a href="">Login</a></p>
                    <RegistrationForm />
                </div>
            </div>
        </div>
    );
}
