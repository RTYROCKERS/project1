import React, { useEffect, useState } from 'react';
import '../styles/MyCart.css';
import Navbar from '../components/Navbar';
import socket from './socket';
function MyCart({ userId }) {
  console.log("User ID in MyCart:", userId);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    // Function to fetch orders
    const fetchOrders = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/customer/${userId}/orders`);
            if (!response.ok) {
                throw new Error("Error fetching orders");
            }
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            setError(error.message);
            console.error("Error:", error);
        }
    };
    const hatao = async (orderId) => {
        const confirmDelete = window.confirm("Are you sure you want to cancel this order?");
        if (!confirmDelete) return;
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/customer/${orderId}/delete`, {
              method: 'DELETE',
          });

          if (!response.ok) {
              throw new Error('Error deleting order');
          }

          const data = await response.json();
          alert(data.message); // Show success message
          setOrders(orders.filter(order => order._id !== orderId)); // Remove deleted order from state
      } catch (error) {
          alert(error.message); // Show error message
      }
  };

    useEffect(() => {
        if(!userId)return;
        fetchOrders();
    }, [userId]);
    useEffect(() => {
        const handleOrderAccepted = ({ orderId, buyerId, buyerName }) => {
            fetchOrders();
        };
    
        socket.on("orderAccepted", handleOrderAccepted);
        return () => socket.off("orderAccepted", handleOrderAccepted);
    }, []);
    return (
        <>
        <div><Navbar/></div>
        <div className='mycart-container'>
            <h1 className='my-cart-title'>User Orders</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {orders.length === 0 ? (
                <div className="no-orders-container">
                    <p className='order-detail'>No orders found.</p>
                    <div className="eco-icon">🌱</div>
                </div>
            ) : (
                <ul className='ordered-detail'>
                    {orders.map((order) => (
                        <li key={order._id || order.id} className="ordered-card">
                        <p>Item Name: {order.name}</p>
                        <p className='price'>Price: Rs {order.price}</p>
                        <p>Image: <img src={order.url} alt={order.name} width="100" /></p>
                        <p>Owner ID: {order.owner?.name || "Unknown"}</p>
                        <p>Buyer ID: {order.buyer?.name || "No buyer assigned"}</p>
                        <p>Preferred Date of Deal: {order.preferredDate || "No Date Assigned"}</p>
                        <p>Preferred Time of Deal: {order.preferredTime || "No preferred Time"}</p>
                        <button className='delete-btn' onClick={()=>hatao(order._id)}>CANCEL ORDER</button>
                    </li>
                    ))}
                </ul>
            )}
        </div>

        </>
    );
}

export default MyCart;

