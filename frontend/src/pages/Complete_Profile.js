import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { handleSuccess, handleError } from '../utils';
import { useNavigate } from 'react-router-dom';
import "../styles/Signup.css";

function UpdateProfile() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    userType: 'customer',
    phone: '',
    serviceArea: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) return handleError("Not authenticated.");

    // Default values
    const payload = {
      name: userInfo.name.trim() || "Anonymous",
      userType: userInfo.userType || "customer",
    };

    if (userInfo.userType === 'dealer') {
      payload.dealerDetails = {
        phoneNumber: /^\d{10}$/.test(userInfo.phone) ? userInfo.phone : "0000000000",
        serviceArea: userInfo.serviceArea.trim() || "Not specified"
      };
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (result.success) {
        handleSuccess(result.message);
        localStorage.setItem('userType', payload.userType);
        if (payload.userType === "dealer") {
            navigate('/home_dealer');
        } else {
            navigate('/home');
        }
      } else {
        handleError(result.error || result.message);
      }

    } catch (err) {
      handleError("Update failed. Try again.");
    }
  };

  return (
    <div className="signup-page">
      <div className="form-container">
        <h2 className="form-title">Update Your Profile</h2>
        <form onSubmit={handleUpdate} className="signup-form">
          <div className="input-content">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={userInfo.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="input-content">
            <label htmlFor="userType">User Type</label>
            <select
              name="userType"
              value={userInfo.userType}
              onChange={handleChange}
              className="form-input"
            >
              <option value="customer">Customer</option>
              <option value="dealer">Dealer</option>
            </select>
          </div>

          {userInfo.userType === 'dealer' && (
            <>
              <div className="input-content">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="10-digit number"
                  value={userInfo.phone}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div className="input-content">
                <label htmlFor="serviceArea">Service Area</label>
                <input
                  type="text"
                  name="serviceArea"
                  placeholder="e.g. Delhi, Mumbai"
                  value={userInfo.serviceArea}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </>
          )}

          <button type="submit" className="signup-button">Update</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default UpdateProfile;
