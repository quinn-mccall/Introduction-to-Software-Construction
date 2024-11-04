import React from 'react';
import './about.css';
import Shivani from '../images/Shivani.jpg';
import Quinn from '../images/Quinn.jpeg';
import Jenn from '../images/Jenn.jpeg';
import Samyukhtha from '../images/Samyukhtha.jpeg';

const About = () => {
  return (
    <div className="about">
      <h1 className="about-header">About Us</h1>
      <p className="about-paragraph">What is PennyPig?</p>
      <p className="about-paragraph">
        Built for UCLA's CS35L Spring '24 using React.js and SQL,<br />
        <span style={{ fontWeight: 'bold' }}>PennyPig</span> is an interactive full stack finance-tracking application for all your budgeting needs.
      </p>

      <p className="about-paragraph">Created by ...</p>
      <div className="about-image-container">
        <div className="about-member">
          <p className="about-name">Shivani Kolla</p>
          <img src={Shivani} alt="Shivani" className="about-image" />
        </div>
        <div className="about-member">
          <p className="about-name">Quinn McCall</p>
          <img src={Quinn} alt="Quinn" className="about-image" />
        </div>
        <div className="about-member">
          <p className="about-name">Jenn Mena</p>
          <img src={Jenn} alt="Jenn" className="about-image" />
        </div>
        <div className="about-member">
          <p className="about-name">Samyukhtha Rajkumar Sridevi</p>
          <img src={Samyukhtha} alt="Sam" className="about-image about-image-samyukhtha" />
        </div>
      </div>
    </div>
  );
};

export default About;
