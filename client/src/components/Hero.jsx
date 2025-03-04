import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import "./Hero.css"; // Import styles

export default function Hero() {
  return (
    <>
      <section className="hero">
        <div className="hero-container">
          <div className="hero-text">
            <h1>Experience Media Like Never Before</h1>
            <p>
              Enjoy award-winning stereo beats with wireless listening freedom and sleek,
              streamlined with premium padded and delivering first-rate playback.
            </p>
            <button className="hero-btn">
              Our Products <span>→</span>
            </button>
          </div>

          <div className="hero-image">
            <img src="https://i.ibb.co/vB5LTFG/Headphone.png" alt="Headphones" />
          </div>

          <div className="social-links">
            <span></span>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>
      </section>
    </>
  );
}
