import React from 'react'
import { FaEnvelope } from "react-icons/fa6";
import './Newsletter.css'

export default function Newsletter() {
  return (
    <div className='subscribe_widgets'>
      <div className='newsletter-container'>
        <div className='newsletter-section p'>
          <div className='col-lg-7'>
            <h1 className='subscribe_text flex gap-20'><span className='item-align animated-icon'><FaEnvelope style={{ transform: "rotate(25deg)" }} /></span>Subscribe for Newsletter</h1>
            <p className=''>Grow Your Business with Our SEO Agency</p>
          </div>
          <div className='col-lg-7'>
            <div class="newsletter-section flex-direction">
              <p>Stay updated with our latest news and offers!</p>
              <form class="newsletter-form">
                <input type="email" placeholder="Enter your email" class="email-input" />
                <button type="submit" class="subscribe-button">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
