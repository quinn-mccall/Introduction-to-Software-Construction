import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import './homePage.css'; // Import the new CSS file
import axios from 'axios';

const BudgetGraph = () => {
  const [userId, setUserId] = useState(sessionStorage.getItem('userId'));
  const [budget, setBudget] = useState(0);
  const [spent, setSpent] = useState(0);
  const [earned, setEarned] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const backendAPI = "http://localhost:3001/";

  useEffect(() => {
    const fetchBudgetAndExpenses = async () => {
      try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        // Fetch the budget
        const budgetResponse = await axios.get(`${backendAPI}budget-month/${userId}/${currentMonth}/${currentYear}`, { withCredentials: true });
        if (budgetResponse.data) {
          setBudget(budgetResponse.data.amount || 0);
        } else {
          setErrorMessage('No budget found for the current month.');
        }

        // Fetch the total expenses
        const expenseResponse = await axios.get(`${backendAPI}totalsum-month/${userId}/E/${currentMonth}/${currentYear}`, { withCredentials: true });
        if (expenseResponse.data) {
          setSpent(expenseResponse.data.total || 0);
        } else {
          setErrorMessage('No expenses found for the current month.');
        }

        // Fetch the total income
        const incomeResponse = await axios.get(`${backendAPI}totalsum-month/${userId}/I/${currentMonth}/${currentYear}`, { withCredentials: true });
        if (incomeResponse.data) {
          setEarned(incomeResponse.data.total || 0);
        } else {
          setErrorMessage('No income found for the current month.');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('Error fetching budget, expenses, and income.');
      }
    };

    if (userId) {
      fetchBudgetAndExpenses();
    }
  }, [userId]);

  const remaining = (budget || 0) - (spent || 0) + (earned || 0);

  const budgetChartData = [
    ...(budget > 0 ? [{ title: 'Budget', value: budget, color: '#007bff' }] : []),
    ...(spent > 0 ? [{ title: 'Spent', value: spent, color: '#FF5722' }] : []),
    ...(earned > 0 ? [{ title: 'Income', value: earned, color: '#28a745' }] : [])
  ];

  const remainingChartData = [
    {title: 'Remaining', value: remaining || 0, color: '#4CAF50' },
    ...(spent > 0 ? [{ title: 'Spent', value: spent, color: '#dc3545' }] : []),
  ];

  const formatAsDollars = (amount) => `$${(amount || 0).toFixed(2)}`;

  const labelStyle = { fontSize: '3px', fontWeight: 'bold' };

  return (
    <div>
      <h2>Budget Overview:</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <div style={{ display: 'flex', marginTop: '-30px' }}>
        <div style={{ flex: 1.25 }}>
          <h4 style={{ marginBottom: '-30px' }}>Budget, Spent, and Income</h4>
          <PieChart
            data={budgetChartData}
            label={({ dataEntry }) => `${dataEntry.title}: ${formatAsDollars(dataEntry.value)}`}
            labelStyle={labelStyle}
            radius={40}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ marginBottom: '-30px' }}>Remaining and Spent</h4>
          <PieChart
            data={remainingChartData}
            label={({ dataEntry }) => `${dataEntry.title}: ${formatAsDollars(dataEntry.value)}`}
            labelStyle={labelStyle}
            radius={40}
          />
        </div>
      </div>
      <h3>Please Navigate to the History Page to view your Transactions:</h3>
      <Link to="/history-page">
        <button className="btn btn-primary history-button">Transaction History</button>
      </Link>
    </div>
  );
};

export default BudgetGraph;