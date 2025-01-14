import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import {jwtDecode} from 'jwt-decode'; 
import Navbar from '../components/Navbar_dealer';
import '../styles/Pickup_orders.css';

function Pickup_orders() {
  const [orders, setOrders] = useState([]);
  const [dealerId, setDealerId] = useState(null); 
  
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/orders/dealer`, {
        method: 'GET',
        headers: {
          'Authorization': localStorage.getItem('token'),  
        },
      });

      const result = await response.json();

      if (response.ok) {
        setOrders(result);
        console.log(result);
      } else {
        handleError(result.message || 'Failed to fetch orders');
      }
    } catch (error) {
      handleError('Error fetching orders');
      console.error(error);
    }
  };


  const getDealerIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      return decoded._id; 
    }
    return null;
  };

  useEffect(() => {
    const dealerId = getDealerIdFromToken();
    setDealerId(dealerId); 
    fetchOrders();
  }, []);  


  const acceptOrder = async (orderId) => {
    if (!dealerId) {
      handleError('You are not logged in as a dealer');
      return;
    }
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/orders/accept/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token'),  
        },
        body: JSON.stringify({
          buyerId: dealerId,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        handleSuccess('Order accepted successfully');
        setOrders(orders.map(order => 
          order._id === orderId ? { ...order, buyer: dealerId } : order
        ));
      } else {
        handleError(result.message || 'Failed to accept order');
      }
    } catch (error) {
      handleError('Error accepting order');
      console.error(error);
    }
  };
  const navigate=useNavigate();
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
    <>
    <div className="dealer-orders-container">
  <Navbar />
  <h1 className="dealer-orders-title">Orders for Sale (Dealer Page)</h1>

  {orders.length === 0 ? (
    <p className="no-orders-message">No orders available at the moment.</p>
  ) : (
    <div className="dealer-orders-grid">
      {orders.map((order, index) => (
        <div key={order._id} className="order-card">
          {order.url ? (
            <img src={order.url} alt={order.name} />
          ) : (
            <p>Image not available</p>
          )}
          //console.log(order)
          <h3>{order.name}</h3>
          <p className="order-price">Price: ${order.price}</p>
          <p>Customer: {order.owner?.name || 'Unknown'}</p>
          <p>Category: {order.category||'Unknown'}</p>
          <p>Preferred Date of Deal: {order.preferredDate || 'No Date Assigned'}</p>
          <p>Preferred Time : {order.preferredTime || 'No preferred Time'}</p>
          
          {order.buyer === null ? (
            <button className="accept-btn" onClick={() => acceptOrder(order._id)}>Accept Order</button>
          ) : (
            <p>Order Accepted</p>
          )}
        </div>
      ))}
    </div>
  )}

  <ToastContainer />
</div>


    </>
  );
}

export default Pickup_orders;

