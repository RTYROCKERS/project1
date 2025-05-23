import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Navbar.css";
import { Button } from "./Button";
import Logo from "../assets/Logo.webp";
import { handleSuccess } from "../utils";

function Navbar() {
  const navigate = useNavigate();

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    // Check authentication on component mount
    const user = localStorage.getItem("loggedInUser");
    setIsAuthenticated(!!user);
  }, []);

  // Add event listener for resizing the window
  useEffect(() => {
    window.addEventListener("resize", showButton);
    return () => window.removeEventListener("resize", showButton); // Cleanup on component unmount
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userType");
    handleSuccess("User Logged out");
    setIsAuthenticated(false);
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img src={Logo} alt="Logo" />
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/mycart" className="nav-links" onClick={closeMobileMenu}>
              My Cart
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-links" onClick={closeMobileMenu}>
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/scrapdetails"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Scrap Details
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/review" className="nav-links" onClick={closeMobileMenu}>
              Reviews
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={() => navigate("/login")}
              className="nav-links-mobile"
              onClick={handleLogout}
            >
              Logout
            </Link>
          </li>
        </ul>
        {button &&
          (isAuthenticated ? (
            <Button
              buttonStyle="btn--outline"
              className="nav-links"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button buttonStyle="btn--outline" className="nav-links">
                Login
              </Button>
            </Link>
          ))}
      </div>
    </nav>
  );
}

export default Navbar;
