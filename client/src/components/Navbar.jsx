import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);  // ✅ Update state immediately
    navigate("/login");
  };


  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">📘 MyStore</Link>
      </div>

      <div className="nav-right">
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          <li><a href="#home">Home</a></li>
          <li><Link to="/products">Products</Link></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>

          {isAuthenticated ? (
            <>
              <li><Link to="/cart" className="cart-icon">🛒</Link></li>
              <li>
                <button onClick={handleLogout} className="auth-btn logout">Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="auth-btn">Login / Signup</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
