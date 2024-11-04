import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import './logout.css';

const Logout = () => {
  const backendAPI = "http://localhost:3001/";
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userId');
    navigate('/sign-in');
    window.location.reload();
  }

  return (
    <div className="logout-container">
      <h3>Are you sure you want to log out?</h3>
      <button onClick={openModal} className='logout-button'>Log Out</button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Logout"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%,-50%)',
          },
        }}
      >
        <h2>Confirm Logout</h2>
        <p >Are you sure you want to log out?</p>
        <button onClick={handleLogout} className='confirm-button'>Yes, Log Out</button>
        <button onClick={closeModal} className='cancel-button'>Cancel</button>
      </Modal>
    </div>
  );
};

export default Logout;