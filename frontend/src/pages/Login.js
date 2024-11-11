import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { handleError, handleSuccess } from '../utils';
// import { GoogleLogin } from '@react-oauth/google';
import "../styles/Login.css"

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleSocialLogin = (platform) => {
        alert(`Redirecting to ${platform} login...`);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and password are required')
        }
        try {
            const url = `${process.env.REACT_APP_API_URL}/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, userType, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                localStorage.setItem('userType', userType);
                if (email === "admin@gmail.com") {
                    setTimeout(() => {
                        navigate('/admin'); // Replace with your specific route
                    }, 1000);}
                else if(userType=="customer"){
                setTimeout(() => {
                    navigate('/home');
                }, 1000)}
                else{
                    setTimeout(() => {
                        navigate('/home_dealer');
                    }, 1000)
                }
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

    // const handleGoogleLoginSuccess = async (credentialResponse) => {
    //     console.log('Google login credentialResponse:', credentialResponse);
    //     const token = credentialResponse.credential;
    
    //     if (token) {
    //         try {
    //             const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/google-login`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({ token }),
    //             });
    
    //             const result = await response.json();
    //             const { success, jwtToken, name } = result;
                
    //             if (success) {
    //                 handleSuccess('Google Login Successful');
    //                 localStorage.setItem('token', jwtToken);
    //                 localStorage.setItem('loggedInUser', name);
    
    //                 setTimeout(() => {
    //                     navigate('/home');
    //                 }, 1000);
    //             } else {
    //                 handleError('Failed to login with Google');
    //             }
    //         } catch (error) {
    //             console.error('Error verifying Google token:', error);
    //             handleError('Error verifying Google login token');
    //         }
    //     } else {
    //         handleError('Failed to retrieve Google login token');
    //     }
    // };
    
    // const handleGoogleLoginFailure = () => {
    //     handleError('Google Login Failed');
    // };

    return (
        <div className="login-page">
      <div className="form-container">
        <h2 className="form-title">Welcome Back</h2>
        <button className="social-button google" onClick={() => handleSocialLogin('Google')}>
          <FaGoogle className="social-icon" /> Login with Google
        </button>
        <button className="social-button facebook" onClick={() => handleSocialLogin('Facebook')}>
          <FaFacebookF className="social-icon" /> Login with Facebook
        </button>
        <div className="divider">OR</div>
        <form onSubmit={handleLogin} className="login-form">
            <div>
                <label htmlFor="email">Email</label>
                <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    placeholder="Enter your Email..."
                    value={loginInfo.email}
                    required
                    className="form-input"
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    placeholder="Enter your Password..."
                    value={loginInfo.password}
                    required
                    className="form-input"
                />
            </div>
          <button type="submit" className="login-button">Login</button>
          <span>Does't have an account ?
            <Link to="/signup">Signup</Link>
          </span>
        </form>
        {/* <div>
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    console.log('GoogleLogin success response:', credentialResponse);
                    handleGoogleLoginSuccess(credentialResponse);
                }}
                onError={() => {
                    console.log('GoogleLogin error');
                    handleGoogleLoginFailure();
                }}
                buttonText="Login with Google" // Changed text here
            />
            </div> */}
        <ToastContainer/>
        <div className="footer-links">
          <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
        </div>
      </div>
    </div>
    );
}

export default Login
