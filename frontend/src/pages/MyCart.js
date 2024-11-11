import React, { useEffect, useState } from 'react';

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
                        <p>Buyer ID: {order.buyer?.name || "No buyer assigned"}</p>
                        <button onClick={()=>hatao(order._id)}>DELETE</button>
                    </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MyCart;

