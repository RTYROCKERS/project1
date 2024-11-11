import React from "react";
// import {Button} from './Button';
import '../styles/Footer.css';
import Signup from '../pages/Signup';
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.webp";

function AppFooter() {

  return (
    <div className="footer-container">
        <div className="footer-links">
            <div className="footer-link-wrapper">
            <h2 className="footer-head" >About Us</h2>
                <div className="footer-link-items">
                    <Link to={Signup}>How it works?</Link>
                    <Link to='/'>Testimonials</Link>
                    <Link to='/'>Careers</Link>
                    <Link to='/'>Investors</Link>
                    <Link to='/'>Terms of services</Link>
                </div>
            </div>
        </div>
        <section className="social-media">
            <div className="social-media-wrap">
                <div className="footer-logo">
                    <img className='footer-logo' src={Logo} alt="logo" />
                </div>
                <small className="website-rights"> <b>GREEN SCRAPHUB</b> <i class="fa-regular fa-copyright"></i> <b>.PRIVACY POLICY</b> </small>
                <div className="social-icons">
                    <Link className="social-icon-link instagram"
                    to='/'
                    target='_blank'
                    aria-label='Facebook'
                    >
                    <i className="fab fa-instagram"></i>
                    </Link>
                    <Link className="social-icon-link Google"
                    to='/'
                    target='_blank'
                    aria-label='Google'
                    >
                    <i className="fab fa-google"></i>
                    </Link>
                    <Link className="social-icon-link twitter"
                    to='/'
                    target='_blank'
                    aria-label='Twitter'
                    >
                    <i className="fab fa-twitter"></i>
                    </Link>
                    <Link className="social-icon-link linkedin"
                    to='/'
                    target='_blank'
                    aria-label='Linkedin'
                    >
                    <i className="fab fa-linkedin"></i>
                    </Link>
                </div>
            </div>
        </section>
    </div>
  )
}

export default AppFooter;