import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import './sign.css';


const SignUpForm = () => {
  const backendAPI = "http://localhost:3001/";
  const navigate = useNavigate(); // Use useHistory hook

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
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
    const requestDataForUser = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.email,
      password: formData.password,
      email: formData.email
    };

    //console.log('Form submitted:', requestData); // Debug log
    //console.log('Form submitted:', requestDataForUser); // Debug log

      // Make the HTTP request
    // withCredentials: true -> ensures that axios sends cookies (including session cookies)
    // with the requests -> maintaining the session between the client and server.
    axios.post(backendAPI + 'users', requestDataForUser, { withCredentials: true })
      .then((response) => {
        if (response.data != "Error when adding user from the database") {
          console.log('Success:', response.data);
          navigate('/sign-in');
        } else {
          // Handle login failure
          setErrorMessage('This email and password already exist. Please use different credentials.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('This email and/or password already exist. Please use different credentials.');
      });
  };

  return (
    <div className="sign-container">
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Last name</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
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
            Sign Up
          </button>
        </div>
        {errorMessage && (
          <div className="alert alert-danger mt-3" role="alert">
            {errorMessage}
          </div>
        )}
        <p className="forgot-password text-right">
          Already registered? <a href="/sign-in">Sign in here.</a>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;