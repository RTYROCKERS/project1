import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { Button } from './Button';
import Logo from "../assets/Logo.webp";
import { handleSuccess } from '../utils';
import '../styles/Navbar.css';

function Navbar_dealer() {
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
    const user = localStorage.getItem("loggedInUser");
    setIsAuthenticated(!!user);
  }, []);

  // Add event listener for resizing the window
  useEffect(() => {
    window.addEventListener('resize', showButton);
    return () => window.removeEventListener('resize', showButton); 
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('userType');
    handleSuccess('User Loggedout');
    setTimeout(() => {
        navigate('/login');
    }, 1000)
}

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img src={Logo} alt="Logo" />
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/home_dealer" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/pickup_orders" className="nav-links" onClick={closeMobileMenu}>
              Pickup Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/history" className="nav-links" onClick={closeMobileMenu}>
              History
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-links" onClick={closeMobileMenu}>
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/review" className="nav-links" onClick={closeMobileMenu}>
              Reviews
            </Link>
          </li>
          <li className="nav-item">
            <Link to={() => navigate('/login')} className="nav-links-mobile" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
        {isAuthenticated && button && (
              <Button
                buttonStyle="btn--outline"
                className="nav-links"
                onClick={handleLogout}
              >
                Logout
              </Button>
          )}
      </div>
    </nav>
  );
}

export default Navbar_dealer;
