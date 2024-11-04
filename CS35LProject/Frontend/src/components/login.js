/*import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './sign.css';

const SignInForm = () => {
  const backendAPI = "http://localhost:3001/";
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });


  const [errorMessage, setErrorMessage] = useState('');


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior


    // Prepare the data to match the backend API requirements
    const requestData = {
      username: formData.email,
      password: formData.password,
    };


    //console.log('Form submitted:', requestData); // Debug log


    // Make the HTTP request
    // withCredentials: true -> ensures that axios sends cookies (including session cookies)
    // with the requests -> maintaining the session between the client and server.
    axios.post(backendAPI + 'login', requestData, { withCredentials: true })
      .then((response) => {
        if (response.data.exist) {
          // Store the user ID in local storage
          localStorage.setItem('userId', response.data.userId);
          // Redirect to home page on successful login
          navigate('/home-page');
        } else {
          // Handle login failure
          setErrorMessage('Login failed. Please check your credentials and try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('Login failed. Please check your credentials and try again.');
      });
  };


  return (
    <div className="sign-container">
      <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        {errorMessage && (
          <div className="alert alert-danger mt-3" role="alert">
            {errorMessage}
          </div>
        )}
        <p className="forgot-password text-right">
          Not yet registered? <a href="/sign-up">Create an account here.</a>
        </p>
      </form>
    </div>
  );
};


export default SignInForm;*/

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './sign.css';

const SignInForm = () => {
  const backendAPI = "http://localhost:3001/";
  const navigate = useNavigate();

  if(sessionStorage.getItem('userId')){
    navigate('/home-page');
  }

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      username: formData.email,
      password: formData.password,
    };

    axios.post(backendAPI + 'login', requestData, { withCredentials: true })
      .then((response) => {
        if (response.data.exist) {
          sessionStorage.setItem('userId', response.data.userId);
          navigate('/home-page');
          window.location.reload();
        } else {
          setErrorMessage('Login failed. Please check your credentials and try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('Login failed. Please check your credentials and try again.');
      });
  };

  return (
    <div className="sign-container">
      <form onSubmit={handleSubmit}>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        {errorMessage && (
          <div className="alert alert-danger mt-3" role="alert">
            {errorMessage}
          </div>
        )}
        <p className="forgot-password text-right">
          Not yet registered? <a href="/sign-up">Create an account here.</a>
        </p>
      </form>
    </div>
  );
};

export default SignInForm;