import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footerpayment-info">
          <h2>We Accept</h2>
          <div className="payment-icons">
            <i class="fab fa-cc-visa"></i>
            <i class="fab fa-cc-mastercard"></i>
            <i class="fab fa-cc-paypal"></i>
            <i class="fab fa-cc-amex"></i>
          </div>
        </div>

        <div className="footer-links">
          <h2>Quick links</h2>
          <div className="quick-links">
            <p>Home</p>
            <p>Category</p>
            <p>About Us</p>
          </div>
        </div>

        <div className="footer-folow">
          <h2>Follow Us on</h2>
          <div className='socialIcons'>
            <i class="fab fa-facebook-f"></i>
            <i class="fab fa-twitter"></i>
            <i class="fab fa-instagram"></i>

          </div>
        </div>
      </div>

      <div className="footer-border"></div>

      <div className="footer-end">
        &copy; 2024 RentIt. All Rights Reserved.
      </div>
    </footer>
  )
}

export default Footer