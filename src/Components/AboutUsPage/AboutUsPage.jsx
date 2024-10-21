import React from 'react';
import './AboutUsPage.css';
import HeaderContent from '../HeaderContent/HeaderContent';
import Footer from '../Footer/Footer';
import LogoAssets from '/logob.png'

function AboutUsPage() {
  return (
    <>
    <HeaderContent/>
    <div className="aboutUs-container">
      <div className="aboutUs-content">
        <div className="aboutUs-text">
          <h1>Helping you rent with ease and convenience</h1>
          <h2>About Us</h2>
          <p>
            At <strong>RentIt</strong>, we make renting easy and convenient. Our platform connects people 
            who need items with those who have them available for rent. Whether it’s tools, equipment, or other items, 
            you can find what you need without the hassle of buying.
          </p>
          <p>
            We believe in sharing resources to save time, money, and space. Our goal is to provide a simple, secure, 
            and reliable platform that benefits both renters and owners.
          </p>
          <p>
            Join <strong>RentIt</strong> today and discover how easy it is to rent instead of buy.
          </p>
        </div>
        <div className="aboutUs-image">
          <img src={LogoAssets} alt="Renting Made Easy" />
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default AboutUsPage;
