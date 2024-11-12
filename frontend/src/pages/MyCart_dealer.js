import React, { useEffect, useState } from 'react';
import '../styles/MyCart.css';
import Navbar from '../components/Navbar_dealer';

function MyCart_dealer({ userId }) {
  console.log("User ID in MyCart:", userId);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    // Function to fetch orders
    const fetchOrders = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/dealer/${userId}/orders`);
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

    useEffect(() => {
        fetchOrders();
    }, [userId]);

    return (
        <>
        <div><Navbar/></div>
        <div className='mycart-container'>
            <h1 className='my-cart-title'>Orders Accepted </h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {orders.length === 0 ? (
                <div className="no-orders-container">
                    <p className='order-detail'>No orders found.</p>
                <div className="eco-icon">🌱</div>
            </div>
            ) : (
                <ul className='ordered-detail'>
                    {orders.map((order) => (
                        <li key={order._id || order.id}  className="ordered-card">
                        <p>Item Name: {order.name}</p>
                        <p>Price: Rs {order.price}</p>
                        <p>Image: <img src={order.url} alt={order.name} width="100" /></p>
                        <p>Owner ID: {order.owner?.name || "Unknown"}</p>
                        <p>Buyer ID: {order.buyer?._id || "No buyer assigned"}</p>
                        <p>Order's preferred Date: {order.preferredDate || "No any date assigned by customer"}</p>
                        <p>Order's preferred Time: {order.preferredTime || "No time alloted by customer"}</p>
                    </li>
                    ))}
                </ul>
            )}
        </div>

        </>
    );
}

export default MyCart_dealer;

