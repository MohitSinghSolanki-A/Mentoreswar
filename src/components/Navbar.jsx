
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/login' : '/api/register';
    try {
      const res = await fetch(`http://0.0.0.0:3001${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        setShowAuthModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">Logo</div>
      <div className="nav-right">
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
          <li>
            <Link to="/login" className="auth-btn">
              Login/Signup
            </Link>
          </li>
        </ul>
      </div>

      </nav>
  );
}
