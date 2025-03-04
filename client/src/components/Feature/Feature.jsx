import React from 'react'
import { FaStopwatch, FaCalendarDays, FaHeadset } from "react-icons/fa6";
import './Feature.css'

export default function Feature() {
  return (
    <div className='feature-container'>
      <div className='col-1'>
        <h1>Feature</h1>
      </div>
      <div className='feature-points'>
        <div className='col-1'>
          <div className='content-box'>
            <span className='icon-box'>
              <FaStopwatch />
            </span>
            <h3>Feature 1</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex</p>
          </div>
        </div>
        <div className='col-1'>
          <div className='content-box'>
            <span className='icon-box'>
              <FaCalendarDays />
            </span>
            <h3>Feature 2</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex</p>
          </div>
        </div>
        <div className='col-1'>
          <div className='content-box'>
            <span className='icon-box'>
              <FaHeadset />
            </span>
            <h3>Feature 3</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex</p>
          </div>
        </div>
      </div>
    </div>
  )
};
