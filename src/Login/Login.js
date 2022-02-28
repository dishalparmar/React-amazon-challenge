import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';

function Login() {

  const navigate = useNavigate();
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

  const signin = (e) => {
    e.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
        .then((auth) => {
          if (auth) {            // if success
            navigate('/');
          }
        })
        .catch(error => alert(error.message));
  }

  const register = (e) => {
    e.preventDefault();
    
    auth.createUserWithEmailAndPassword(email, password)
        .then((auth) => {
          if (auth) {            // if success
            navigate('/');
          }
        })
        .catch(error => alert(error.message))
  }

  return (
    <div className='login'>
      <img className='login-logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/800px-Amazon_logo.svg.png' alt='Amazon Logo Login'/>
      <div className='login-container'>
        <h2>Sign in</h2>
        <form>
          <h5>Email</h5>
          <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />

          <h5>Password</h5>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

          <button onClick={signin} type='submit' className='login-signin-btn'>Sign in</button>
        </form>
        <p>By signing-in you agree to the Amazon 'FAKE CHALLANGE' Conditions of Use and Sale.
          Please see our Privacy Notice, Cookie Notice etc etc.
        </p>
        <button onClick={register} className='login-create-account-btn'>Create Amazon Account</button>
      </div>
    </div>
  )
}

export default Login
