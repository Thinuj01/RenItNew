import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footerpayment-info">
          <h2>We Accept</h2>
          <div className="payment-icons">
            <i className="fa fa-cc-visa"></i>
            <i className="fa fa-cc-mastercard"></i>
            <i className="fa fa-cc-paypal"></i>
            <i className="fa fa-cc-amex"></i>
          </div>
        </div>

        <div className="footer-links">
          <h2>Quick links</h2>
          <a href="/Home">Home</a>
          <a href="/Category">Category</a>
          <a href="/Package">Package</a>
          <a href="/About">About Us</a>
        </div>

        <div className="footer-contacts">
          <h2>For More Details</h2>
          <p><i className="fa fa-phone"></i> +94 6421 28920</p>
          <p><i className="fa fa-phone"></i> ++94 6421 28920</p>
          <p><i className="fa fa-envelope"></i> info@rentit.com</p>
        </div>

        <div className="footer-folow">
          <h2>Follow Us on</h2>
        </div>
      </div>

      <div className="footer-border"></div>     

      <div className="footer-end">
        &copy; 2024 RentIt. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer