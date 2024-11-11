import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import "../styles/Signup.css"

function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        userType: 'customer',
        phone: '', //phone number for dealers
        serviceArea: '' // service area for dealers
    });

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSocialLogin = (platform) => {
        alert(`Redirecting to ${platform} login...`);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, userType,phone,serviceArea } = signupInfo;
        
        //Validation for required fields 
        if (!name || !email || !password || !userType || (userType === 'dealer' && (!phone || phone.length !== 10))) {
            return handleError('All fields are required,and phone number must be 10 digits.')
        }

        // Prepare the request body based on user type
        const signupData = {
          name,
          email,
          password,
          userType,
          ...(userType === 'dealer' && { phone, serviceArea }) // Spread only if userType is dealer
        };

        try {
            const url = `${process.env.REACT_APP_API_URL}/auth/signup`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupData), // Use the new signupData object
            });
            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message || message;
                handleError(details);
            } else {
                handleError(message);
            }
            // console.log(result);
        } catch (err) {
            handleError(err);
        }
    }
    return (
        <div className="signup-page">
            <div className="form-container">
              <h2 className="form-title">Create Your Account</h2>
              <form onSubmit={handleSignup} className="signup-form">
                <div className='input-content'>
                <label htmlFor="name">Username:</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Username"
                  value={signupInfo.username}
                  onChange={handleChange}
                  autoFocus
                  className="form-input"
                />
                </div>
                <div className='input-content'>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={signupInfo.email}
                  onChange={handleChange}
                  className="form-input"
                />
                </div>
                <div className='input-content'>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={signupInfo.password}
                  onChange={handleChange}
                  className="form-input"
                />
                </div>
                <div className='input-content'>
                    <label htmlFor='userType'>I am a:</label>
                    <select name='userType' value={signupInfo.userType} onChange={handleChange}>
                        <option value='customer'>Customer</option>
                        <option value='dealer'>Dealer</option>
                    </select>
                </div>

                {/* Conditionally render additional fields if user is a dealer */}
                {signupInfo.userType === 'dealer' && (
                    <>
                        <div className='input-content'>
                            <label htmlFor='phone'>Phone Number</label>
                            <input
                                onChange={handleChange}
                                type='text'
                                name='phone'
                                placeholder='Enter your phone number... (10 digits)'
                                value={signupInfo.phone}
                                maxLength={10} // Limit input to 10 characters
                                className='form-input'
                            />
                        </div>
                        <div className='input-content'>
                            <label htmlFor='serviceArea'>Service Area (Comma-separated cities)</label>
                            <input
                                onChange={handleChange}
                                type='text'
                                name='serviceArea'
                                placeholder='Enter cities where you provide service...'
                                value={signupInfo.serviceArea}
                                className='form-input'
                            />
                        </div>
                    </>
                )}

                <button type='submit' className="signup-button">Signup</button>
                <span>Already have an account ?
                  <Link to="/login">Login</Link>
                </span>
              </form>
              <div className="divider">OR</div>
                <button className="social-button google" onClick={() => handleSocialLogin('Google')}>
                  <FaGoogle className="social-icon" /> Sign up with Google
                </button>
                <button className="social-button facebook" onClick={() => handleSocialLogin('Facebook')}>
                  <FaFacebookF className="social-icon" /> Sign up with Facebook
                </button>
              <ToastContainer/>
            </div>
        </div>
    )
}

export default Signup
