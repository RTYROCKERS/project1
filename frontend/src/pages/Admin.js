import React, { useEffect, useState } from "react";

function Admin() {
  const [orders, setOrders] = useState([]);
  const [openDropdowns, setOpenDropdowns] = useState({}); // Track which dropdowns are open

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/auth/admin`
        );
        const data = await response.json();
        console.log(data); // Log data to inspect its structure
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  // Toggle dropdown visibility for an order by index
  const toggleDropdown = (index) => {
    console.log(`Toggling dropdown for index ${index}`); // Debugging line
    setOpenDropdowns((prevOpenDropdowns) => {
      const newState = { ...prevOpenDropdowns, [index]: !prevOpenDropdowns[index] };
      console.log('New openDropdowns state:', newState); // Debugging state update
      return newState;
    });
  };
  console.log("Current openDropdowns state: ", openDropdowns);

  

  return (
    <div>
      <h1>Orders Summary</h1>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>
            <p>Order Name: {order.name}</p>
            <p>Price: Rs {order.price}</p>
            <p>Occurrences: {order.count}</p>
            {/* Debugging */}
            <p>Documents: </p>{" "}
            {/* Log documents */}
            <button onClick={() => toggleDropdown(index)}>
              {openDropdowns[index] ? "Hide Documents" : "Show Documents"}
            </button>
            {openDropdowns[index] && order.docs && (
              <ul>
                {order.docs.map((doc, docIndex) => (
                  <li key={docIndex}>
                    {/* Display specific properties of the document */}
                    <p>Name: {doc.name}</p>
                    <p>
                      URL:{" "}
                      <a href={doc.url} target="_blank" rel="noopener noreferrer">
                        {doc.url}
                      </a>
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;