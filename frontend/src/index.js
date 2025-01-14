import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/ReactToastify.css';
import { GoogleOAuthProvider } from '@react-oauth/google';  // Import GoogleOAuthProvider



const root = ReactDOM.createRoot(document.getElementById('root'));
const clientId = "873681028967-vd063dh6atqsldkfdkkaqbsajdm01em3.apps.googleusercontent.com";
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}> {/* Wrap your app with GoogleOAuthProvider */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
reportWebVitals();
