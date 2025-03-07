import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
import "./Navbar.css";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsLoggedIn(authStatus);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <div
        className={`overlay ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
      ></div>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <Link to="/">Mentoreswar</Link>
          </div>
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaXmark /> : <MdMenu />}
          </div>
          <div className={`navmenu ${menuOpen ? "open" : ""}`}>
            <div className="nav-links">
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/TestSeries" onClick={() => setMenuOpen(false)}>Test Series</Link>
              <Link to="/mentorship" onClick={() => setMenuOpen(false)}>Mentorships</Link>
              <Link to="/products" onClick={() => setMenuOpen(false)}>Courses</Link>
              <Link to="/aboutus">About Us</Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>
            </div>
            <div className="nav-auth">
              {isLoggedIn ? (
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              ) : (
                <Link to="/login" className="login-btn" onClick={() => setMenuOpen(false)}>Login</Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
