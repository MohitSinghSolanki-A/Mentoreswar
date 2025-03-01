import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsLoggedIn(authStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link to="/">Mentoreswar</Link>
      </div>

      {/* Hamburger Menu */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Navbar Links */}
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li><Link to="/aboutus" onClick={() => setMenuOpen(false)}>About Us</Link></li>
        <li><Link to="/products" onClick={() => setMenuOpen(false)}>TestSeries</Link></li>
        <li><Link to="/TestSeries" onClick={() => setMenuOpen(false)}>ViewTest</Link></li>
        <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
        {isLoggedIn ? (
          <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
        ) : (
          <li><Link to="/login" className="login-btn">Login</Link></li>
        )}
      </ul>
    </nav>
  );
}
