import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { useState } from 'react';
import RefrshHandler from './RefrshHandler';
import ScrapDetails from './pages/ScrapDetails';
import MyCart from './pages/MyCart';
import Reviews from './pages/Review';
import ElectronicScrap from './components/ElectronicScraps';
import Wood from './components/Wood';
import Metal from './components/Metal';
import Plastic from './components/Plastic';
import Glass from './components/Glass';
import Homedealer from './pages/Home_dealer';
import {jwtDecode} from 'jwt-decode'; 
import MyCart_dealer from './pages/MyCart_dealer';
import Admin from './pages/Admin';
import Pickup_orders from './pages/Pickup_orders';

function App() {
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token"); 
    if (token) {
      const decoded = jwtDecode(token); 
      return decoded._id;  
    }
    return null; 
  }
const userId = getUserIdFromToken();
  
  const [isAuthenticated, setIsAuthenticated] = useState(!!userId);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login"/>
  }

  return (
    <>
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to ="/Home"/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/profile' element={<PrivateRoute element={<Profile/>}/> }/>
        <Route path='/scrapdetails' element={<PrivateRoute element={<ScrapDetails/>}/>}/>
        <Route path='/mycart' element={<MyCart userId={userId} />} />
        <Route path='/history' element={<PrivateRoute element={<MyCart_dealer userId={userId} />} />}/>
        <Route path='/review' element={<Reviews/>}></Route>
        <Route path='/electronicScraps' element={<ElectronicScrap/>}></Route>
        <Route path='/metalWaste' element={<Metal/>}></Route>
        <Route path='/plasticWaste' element={<Plastic/>}></Route>
        <Route path='/woodenWaste' element={<Wood/>}></Route>
        <Route path='/glassWaste' element={<Glass/>}></Route>
        <Route path='/admin' element={<PrivateRoute element={<Admin/>}/>}/>
        <Route path='/pickup_orders' element={<Pickup_orders/>}></Route>

        <Route path="/home" element={<Home />} />
        <Route path='/home_dealer' element={<PrivateRoute element={<Homedealer />} />} />
      </Routes>
    </>
  );
}

export default App;

