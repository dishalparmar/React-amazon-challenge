import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { auth } from './Firebase';
import Header from './Header/Header';
import Home from './Home/Home';
import Checkout from './Checkout/Checkout';
import Login from './Login/Login';
import Orders from './Orders/Orders';
import { useStateValue } from './State/StateProvider';
import Payment from './Payment/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

function App() {

  const [state, dispatch] = useStateValue();
                                    // Publishable key from stripe
  const stripePromise = loadStripe('Publishable key from stripe goes here');

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      
      if (authUser) {               // User logged in
        dispatch({
          type: 'SetUser',
          user: authUser
        });
      }else {                       // User logged out
        dispatch({
          type: 'SetUser',
          user: null
        });
      }
    })
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/payment" element={<Elements stripe={stripePromise}><Payment /></Elements>}></Route> 
          <Route path="/orders" element={<Orders />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
