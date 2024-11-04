import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './userProfile.css';

const backendAPI = "http://localhost:3001/";

const ProfilePage = ({ modalIsOpen, closeModal }) => {
  const [userId, setUserId] = useState(sessionStorage.getItem('userId'));
  const [firstName, setFirstName] = useState(sessionStorage.getItem('firstName'));
  const [lastName, setLastName] = useState(sessionStorage.getItem('lastName'));
  const [registrationDate, setRegistrationDate] = useState(sessionStorage.getItem('registrationDate'));
  const [username, setUsername] = useState(sessionStorage.getItem('username'));
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(backendAPI + 'users/' + userId, { withCredentials: true });
        if (response.data.id) {
          setUserId(response.data.id);
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setRegistrationDate(response.data.registrationDate);
          setUsername(response.data.username);
          sessionStorage.setItem('userId', response.data.id);
          sessionStorage.setItem('firstName', response.data.firstName);
          sessionStorage.setItem('lastName', response.data.lastName);
          sessionStorage.setItem('registrationDate', response.data.registrationDate);
          sessionStorage.setItem('username', response.data.username);
          setUserData(response.data); 
        } 
      } catch (error) {
        console.error('Error verifying user:', error);
      }
    };

    if (userId) {
      verifyUser();
    } else {
      navigate('/sign-in');
    }
  }, [userId, navigate]);

  const date = new Date(registrationDate);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();


  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const formattedDateMDY = `${monthNames[month]} ${day}, ${year}`;


  return (
    <div className='ret'>
      {userData ? (
        <div className="user-profile">
          <h2>About {userData.username}</h2>
          <p>Username: {userData.username}</p>
          {/* <p>User ID Number: {userData.id}</p> for security */}
          <p>First Name: {userData.firstName}</p>
          <p>Last Name: {userData.lastName}</p>
          <p>User since: {formattedDateMDY}</p>
          <button onClick={closeModal}>Close</button>
        </div>
      ) : (
        <p className="loading">Loading user data...</p>
      )}
    </div>
  );
};
export default ProfilePage;