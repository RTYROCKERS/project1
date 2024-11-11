import React from 'react'
// import { useNavigate } from 'react-router-dom';
// import { handleError, handleSuccess } from '../utils';
// import { ToastContainer } from 'react-toastify';
import '../App.css';
import HeroSection from '../components/HeroSection';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import '../styles/home.css';
import Blog from '../components/Blog';


function Home() {
    return (
        <>
            <HeroSection/>
            <section className='how-works'>
                <div className="works-item">
                    <h2 className="how_works_title">How it works
                    </h2>
                    <div className="inner-item">
                        <div className="how-works-col">
                            <h4>Schedule a pickup</h4>
                            <img src="https://plus.unsplash.com/premium_photo-1683984171269-04c84ee23234?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNjaGVkdWxlJTIwYSUyMHBpY2t1cCUyMGluJTIwZ3JlZW4lMjBjb2xvcnxlbnwwfHwwfHx8MA%3D%3D" alt="pickup" />
                        </div>
                        <div className="how-works-col">
                            <h4>Pickup at your address</h4>
                            <img src="https://plus.unsplash.com/premium_photo-1715573563379-d18ba5339340?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZSUyMGluJTIwZ3JlZW58ZW58MHx8MHx8fDA%3D" alt="address" />
                        </div>
                        <div className="how-works-col">
                            <h4>Receive payment</h4>
                            <img src="https://plus.unsplash.com/premium_photo-1681760173592-74f9a85003b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVjZWl2ZSUyMHBheW1lbnQlMjBpbiUyMGdyZWVufGVufDB8fDB8fHww" alt="payment" />
                        </div>
                    </div>
                </div>
            </section>
            <section id="whyus" className="why_us">
                <div className="whyus-item">
                    <h2 className="header-why-us">Why us</h2>
                    <div className="inner-item">
                        <div className="why-us-col">
                            <img src="	https://ikp.edgekit.net/h1rxzpffx/scrapuncle/why-us/rupee_h5cohN94jkyh.png" alt="Best Rates" />
                            <div>
                                <h4>Best Rates</h4>
                                <p>We provide the best value for your scrap from our network of Recyclers.</p>
                            </div>
                        </div>
                        <div className="why-us-col">
                            <img src="	https://ikp.edgekit.net/h1rxzpffx/scrapuncle/why-us/thumbs-up_vOIp-YChzZhh.png" alt="Convenience" />
                            <div>
                                <h4>Convenience</h4>
                                <p>Doorstep pickup according to user's convenient date and time.</p>
                            </div>
                        </div>
                        <div className="why-us-col">
                            <img src="https://ikp.edgekit.net/h1rxzpffx/scrapuncle/why-us/trust_TmQdK2fLBVD.png" alt="Trust" />
                            <div>
                                <h4>Trust</h4>
                                <p>Trained and Verified Pickup Staff with smart weighing scale.</p>
                            </div>
                        </div>
                        <div className="why-us-col">
                            <img src="https://ikp.edgekit.net/h1rxzpffx/scrapuncle/why-us/eco_wwfqNtl3n-r.png" alt="Eco-friendly" />
                            <div>
                                <h4>Eco-friendly</h4>
                                <p>We ensure responsible recycling of your scrap items.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className='m-5'><Blog/></div>
            {/* <div><Cards/></div> */}


    
        <Footer/>
        </>
    )
}

export default Home
