import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TransactionList from './TransactionList/transactionList'; // Ensure the correct import path
import './historyPage.css'; // Import the new CSS file

const backendAPI = "http://localhost:3001/";

const HistoryPage = () => {
  const [userId, setUserId] = useState(sessionStorage.getItem('userId'));
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  //User data
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  //console.log(userId);
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(backendAPI + 'users/' + userId, { withCredentials: true });
        if (response.data.id) {
          setUserId(response.data.id);
          setUsername(response.data.firstName);
          setEmail(response.data.username);
          sessionStorage.setItem('userId', response.data.id);
        }
      } catch (error) {
        console.error('Error verifying user:', error);
      }
    };

    if (userId) {
      verifyUser();
    }
    else {
      navigate('/sign-in');
    }
  }, [userId, navigate]);


  const handleDownloadStatement = async () => {
    try {
      const response = await axios.get(`${backendAPI}statement/${userId}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `statement_${username}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setMessage('Statement downloaded successfully.');
      setMessageType('success');
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      console.error('Error downloading statement:', error);
      setMessage('Error downloading statement.');
      setMessageType('error');
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const handleSendEmail = async () => {
    try {
      const response = await axios.post(`${backendAPI}send-statement`, { userId: userId, email: email, name: username });
      if(response.data){
        setMessage(`Statement sent to ${email} successfully.`);
        setMessageType('success');
        setTimeout(() => setMessage(''), 5000);
      }
    } catch (error) {
      console.error('Error sending statement email:', error);
      setMessage('Error sending statement email.');
      setMessageType('error');
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <div className="history-page-container">
      <h1>History of Transactions</h1>
      {userId ? (
        <>
          <div className="button-container">
            <button type="button" onClick={handleDownloadStatement}>Download Statement</button>
            <button type="button" onClick={handleSendEmail}>Send Statement to Email</button>
          </div>
          {message && (
            <div className={`alert mt-3 ${messageType === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
              {message}
            </div>
          )}
          <TransactionList userId={userId} />
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default HistoryPage;
