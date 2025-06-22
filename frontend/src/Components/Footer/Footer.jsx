import React from 'react'
import { assets } from '../../assets/assets'
import './Footer.css'

const Footer = () => {
  return (
    <div className="Footer">
      <div className="left_footer">
        <img src={assets.heart_rate} alt="" />
        <p> © 2025 SRRS. All rights reserved  davidmbah.</p>
      </div>
      <div className="right_footer">
        <a href="" className='pr'>Privacy Policy</a>
        <a href="" className='term'>Terms of Service</a>
        <a href="" className='contact'>Contact</a>
      </div>
    </div>
  )
}

export default Footer