import React, { useEffect, useState } from "react";
import '../styles/Admin.css';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { Button } from '../components/Button';

function Admin() {
  const navigate = useNavigate();
  const [button, setButton] = useState(true);
  const [orders, setOrders] = useState([]);
  const [openDropdowns, setOpenDropdowns] = useState({});

  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/auth/admin`
        );
        const data = await response.json();
        console.log(data); 
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const toggleDropdown = (index) => {
    console.log(`Toggling dropdown for index ${index}`); 
    setOpenDropdowns((prevOpenDropdowns) => {
      const newState = { ...prevOpenDropdowns, [index]: !prevOpenDropdowns[index] };
      console.log('New openDropdowns state:', newState);
      return newState;
    });
  };
  console.log("Current openDropdowns state: ", openDropdowns);

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
    <div className="admin-container">
      <h1 className="admin-title">Welcome Admin <br/> <h2 className="subtitle">Here is the analysis of the deals.</h2></h1>
      
      <ul className="admin-outer-list">
        {orders.map((order, index) => (
          <li className="admin-outer-list-text" key={index}>
            <p className="text-para">Order Name: {order.name}</p>
            <p className="text-para">Price: Rs {order.price}</p>
            <p className="text-para">Occurrences: {order.count}</p>
            <p className="text-para">Documents: </p>{" "}
            <button className="toggle-button" onClick={() => toggleDropdown(index)}>
              {openDropdowns[index] ? "Hide Documents" : "Show Documents"}
            </button>
            {openDropdowns[index] && order.docs && (
              <ul className="admin-inner-list">
                {order.docs.map((doc, docIndex) => (
                  <li className="admin-inner-list-text" key={docIndex}>
                    <p className="text-para">Name: {doc.name}</p>
                    <p className="text-para">Customer Name: {doc.owner?.name || "Unknown"}</p>
                    <p className="text-para">
                      Dealer Name: {doc.buyer?.name || "No buyer assigned"}
                    </p>
                    <p className="text-para">Preferred Date: {doc.preferredDate || "No Date Assigned "}</p>
                    <p className="text-para">Preferred Time : {doc.preferredTime || "No Time Assigned"}</p>
                    <p className="text-para">
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

      <Button
          buttonStyle="btn--outline"
          className="nav-links"
          onClick={handleLogout}
        >
          Logout
        </Button>
    </div>

  );
}

export default Admin;