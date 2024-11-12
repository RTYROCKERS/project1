import React from 'react';
// import {Button} from './Button';
import '../styles/HeroSection.css';
import '../App.css';
// import Backgroundimg from '../assets/homebackground.webp';
import Image1 from '../assets/herosection-1.jpeg';
import Image2 from '../assets/herosection-2.jpeg';
import Image3 from '../assets/herosection-3.jpeg';
import Image4 from '../assets/herosection-4.jpg';


function HeroSection() {
  return (
    <div>

      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            
          </div>

          <div className="carousel-item active">
            <img src={Image4} alt="..." />
          </div>
          <div className="carousel-item">
            <img  src={Image2} alt="..." />
          </div>
          <div className="carousel-item">
            <img  src={Image3} alt="..." />
          </div>
          <div className="carousel-item">
            <img  src={Image1} alt="..." />
          </div>
          
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>



  );
}

export default HeroSection;
