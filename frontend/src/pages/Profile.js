import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import "../App.css";
import "../styles/Profile.css";

function Profile() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [userType, setUserType] = useState("");
  const [products, setProducts] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
    setUserType(localStorage.getItem("userType"));
  }, []);


  const fetchProducts = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/products`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (err) {
      handleError(err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      {/* <h1 className='Profile'>Profile</h1> */}
      <div className="background"></div>
      <div className="container">
        <div className="item">
          <h2 className="logo">Review Profile</h2>
          <div className="text-item">
            <h1>
              Welcome {loggedInUser} ({userType}) <br />
              <span className="profile-text">
                {userType === "customer" ? (
                  <>
                    Transform your unused scrap into cash with ease! Our
                    platform lets you sell scrap quickly and effortlessly,
                    making recycling profitable and hassle-free. Not only will
                    you be earning money from items you no longer need, but
                    you’ll also be helping to reduce waste and support a
                    greener, cleaner planet. With our eco-friendly mission,
                    every piece of scrap you sell makes a difference. So, why
                    let valuable items gather dust? Clear out the clutter, make
                    an impact, and join us on the journey towards a sustainable
                    future – one scrap at a time!
                    <br />
                    This emphasizes ease of use, environmental impact, and the financial benefits of selling scrap through your site.
                  </>
                ) : (
                  <>
                    Welcome, dealer! Join us in our mission to promote
                    sustainability by sourcing high-quality scrap materials. Our
                    platform connects you directly with eco-conscious sellers,
                    providing a reliable, efficient way to procure materials and
                    support green practices. With access to diverse scrap
                    sources, you can find exactly what you need to keep your
                    operations running smoothly and sustainably. Let’s work
                    together for a cleaner future!
                  </>
                )}
              </span>
            </h1>

            <p>
              {userType === "customer" ? (
                <h2>Schedule your scrap</h2> 
              ) : (
                <h2> Is there any customer selling scrap</h2> 
              )}
            </p>
            <br />
          </div>
          <span className="dirc-to-home">
            Return to
            <Link
              to={
                localStorage.getItem("userType") === "dealer"
                  ? "/home_dealer"
                  : "/home"
              }
            >
              Home
            </Link>
          </span>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Profile;
