import React, { useEffect, useState } from 'react';

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
        <div>
            <h1>User Orders</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order._id || order.id}>
                        <p>Item Name: {order.name}</p>
                        <p>Price: Rs {order.price}</p>
                        <p>Image URL: <img src={order.url} alt={order.name} width="100" /></p>
                        <p>Owner ID: {order.owner?.name || "Unknown"}</p>
                        <p>Buyer ID: {order.buyer?._id || "No buyer assigned"}</p>
                    </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MyCart_dealer;

