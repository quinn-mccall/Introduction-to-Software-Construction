import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import BudgetForm from './budgetForm';
import BudgetGraph from './budgetGraph';
import axios from 'axios';
import './homePage.css'; // Import the new CSS file

const backendAPI = "http://localhost:3001/";

const HomePage = () => {
  const [userId, setUserId] = useState(sessionStorage.getItem('userId'));
  const navigate = useNavigate();

  const [username, setUsername] = useState('');

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(backendAPI + 'users/' + userId, { withCredentials: true });
        if (response.data.id) {
          setUserId(response.data.id);
          setUsername(response.data.firstName);
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

  const [budget, setBudget] = useState(0);
  const [spent, setSpent] = useState(0);
  const [expenses, setExpenses] = useState([]);

  const handleBudgetSubmit = (budgetAmount) => {
    setBudget(budgetAmount);
  };

  const handleExpenseSubmit = (expenseAmount, expenseReason) => {
    setSpent(spent + expenseAmount);
    const newExpense = {
      amount: expenseAmount,
      reason: expenseReason,
      time: new Date().toLocaleString()
    };
    setExpenses([...expenses, newExpense]);
  };

  return (
    <div className="home-page-container">
      <h1>Expense Tracker</h1>
      <h5>Welcome, {username}! 👋</h5>
      <h5>Track your expenses and income to stay on budget and achieve your goals!</h5>
      <BudgetForm onBudgetSubmit={handleBudgetSubmit} onExpenseSubmit={handleExpenseSubmit} />
      <BudgetGraph />
    </div>
  );
};

export default HomePage;