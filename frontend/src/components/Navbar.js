import React,{useState,useEffect} from 'react';
import { useNavigate,Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { Button } from './Button';
import Logo from "../assets/Logo.webp";

function Navbar() {
    const navigate = useNavigate();

    const [click,setClick] = useState(false);
    const [button,setbutton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);


    const showButton = () => {
      if (window.innerWidth <= 960) {
        setbutton(false);
      }else{
        setbutton(true);
      }
    };

    useEffect(() =>{
      showButton();
    }, []);

    window.addEventListener('resize',showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          <img src={Logo} alt="Logo" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
          </div>
          <ul className={click ? 'nav-menu active': 'nav-menu'}>
            <li className="nav-item">
              <Link to='/' className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/mycart' className="nav-links" onClick={closeMobileMenu}>
                My Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/profile' className="nav-links" onClick={closeMobileMenu}>
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/scrapdetails' className="nav-links" onClick={closeMobileMenu}>
                Scrap Details
              </Link>
            </li>
            <li className="nav-item">
              <Link to='/review' className="nav-links" onClick={closeMobileMenu}>
                Reviews
              </Link>
            </li>
            <li className="nav-item">
              <Link  to={() => navigate('/login')} className="nav-links-mobile" onClick={closeMobileMenu}>
                Login
              </Link>
            </li>
          </ul>
          {button &&(
            <>
            <Button type="button" onClick={() => navigate('/login')} className="nav-links" buttonStyle='btn--outline'>Login</Button>
            </> 
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar 

