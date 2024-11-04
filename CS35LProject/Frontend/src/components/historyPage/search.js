import React, { useState } from 'react';
import axios from 'axios';
import './search.css'; 

const Search = ({ userId, setTransactions }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (categoryName.trim() === '') { 
        response = await axios.get(`http://localhost:3001/financialtransaction-user/${userId}`, { withCredentials: true });
      } else {
        response = await axios.get(`http://localhost:3001/financialtransaction/${userId}/category/${categoryName}`);
      }
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };
  const handleReset = async () => {
    setCategoryName(''); 
    try {
      const response = await axios.get(`http://localhost:3001/financialtransaction-user/${userId}`, { withCredentials: true });
      setTransactions(response.data); 
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Enter Category:"
        className="search-input"
      />
      <button type="submit" className="search-button">Search</button>
      <button type="reset" className="reset-button"onClick={handleReset}>Reset</button>
    </form>
  );
};

export default Search;