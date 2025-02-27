import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";



export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showRegister, setShowRegister] = useState(false); // Track if user exists

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowRegister(false); // Reset register button on submit

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("isAuthenticated", "true");

        toast.success("🎉 Login successful!", { position: "top-right" });

        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        if (data.error === "Invalid credentials") {
          toast.error("❌ Incorrect password!", { position: "top-right" });
        } else if (data.error === "User not found") {
          setShowRegister(true);
          toast.warn("⚠️ No account found! Register first.", { position: "top-right" });
        } else {
          toast.error("❌ Login failed!", { position: "top-right" });
        }
      }
    } catch (error) {
      toast.error("❌ Something went wrong. Try again!", { position: "top-right" });
    }
  };


  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>

        {showRegister && (
          <button className="register-btn" onClick={() => navigate("/register")}>
            Register Here
          </button>
        )}
      </div>
    </div>
  );
}
