import React from 'react';
// import {Button} from './Button';
import '../styles/HeroSection.css';
import '../App.css';
// import Backgroundimg from '../assets/homebackground.webp';

function HeroSection() {
  return (
    <div>

      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            
          </div>

          <div className="carousel-item active">
            <img src="https://plus.unsplash.com/premium_photo-1682144723453-66ccd1555232?q=80&w=1960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" style={{ filter: "brightness(40%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://plus.unsplash.com/premium_photo-1664811569310-04a7c276df1c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZW52aXJvbm1lbnR8ZW58MHx8MHx8fDA%3D" className="d-block w-100" style={{ filter: "brightness(50%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1650112274147-03a2dba421c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGVudmlyb25tZW50YWwlMjBwcm90ZWN0aW9ufGVufDB8fDB8fHww" className="d-block w-100" style={{ filter: "brightness(50%)" }} alt="..." />
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
