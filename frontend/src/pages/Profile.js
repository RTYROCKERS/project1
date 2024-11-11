import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import '../App.css';
import '../styles/Profile.css';

function Profile() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [userType, setUserType] = useState('');
    const [products, setProducts] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
        setUserType(localStorage.getItem('userType'));
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('userType');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        }, 1000)
    }

    const fetchProducts = async () => {
        try {
            const url = `${process.env.REACT_APP_API_URL}/products`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            }
            const response = await fetch(url, headers);
            const result = await response.json();
            console.log(result);
            setProducts(result);
        } catch (err) {
            handleError(err);
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])
  return (
    <>
        {/* <h1 className='Profile'>Profile</h1> */}
      <div className="background"></div>
      <div className="container">
        <div className="item">
            <h2 className="logo">Review Profile</h2>
            <div className="text-item">
                <h1>Welcome {loggedInUser} ({userType}) <br/><span>to make a perfect deal.<br />Ready to make a perfect deal.</span></h1>
                <button onClick={handleLogout} className="logout-button">Logout</button>
                <p>
                {userType === 'customer' ? (
                    <h2>Schedule your scrap</h2> // Message for customers
                ) : (
                    <h2> Is there any customer selling scrap</h2> // Message for dealers
                )}
                </p>
                <br />
                <p>
                {products.length > 0 ? (
                    products.map((item, index) => (
                        <ul key={index}>
                            <li>{item.name} : {item.price}</li>
                        </ul>
                    ))
                ) : (
                    <p>No Products available.</p>
                )}
                </p>
            </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Profile
