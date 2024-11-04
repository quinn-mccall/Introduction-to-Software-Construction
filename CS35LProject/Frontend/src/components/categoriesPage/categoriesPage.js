import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CategoryItem from './categoryItem';
import AddCategoryForm from './addCategoryForm';
import './categoriesPage.css'; 

const backendAPI = "http://localhost:3001/";

const CategoriesPage = () => {
  const [userId, setUserId] = useState(sessionStorage.getItem('userId'));
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(`${backendAPI}users/${userId}`, { withCredentials: true });
        if (response.data.id) {
          setUserId(response.data.id);
          sessionStorage.setItem('userId', response.data.id);
        } else {
          navigate('/sign-in');
        }
      } catch (error) {
        console.error('Error verifying user:', error);
        navigate('/sign-in');
      }
    };

    if (userId) {
      verifyUser();
      fetchCategories(userId);
    } else {
      navigate('/sign-in');
    }
  }, [userId, navigate]);

  const fetchCategories = async (userId) => {
    try {
      const response = await axios.get(`${backendAPI}categories/${userId}`);
      setCategories(response.data);
    } catch (error) {
      setErrorMessage('Error fetching categories');
    }
  };

  const handleAddCategory = async (newCategory) => {
    try {
      const response = await axios.post(`${backendAPI}category`, { ...newCategory, appUserId: userId });
      setCategories([...categories, response.data]);
      setSuccessMessage('Category added successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Error adding category');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`${backendAPI}category/${categoryId}`);
      setCategories(categories.filter(category => category.id !== categoryId));
      setSuccessMessage('Category deleted successfully');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Error deleting category, make sure no transactions are under this category');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  return (
    <div className="categories-page-container">
      <h1>Categories</h1>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <div className="button-container-categories">
        <AddCategoryForm onAddCategory={handleAddCategory} />
      </div>
      <div className="categories-list">
        {categories.map(category => (
          <CategoryItem key={category.id} category={category} onDelete={handleDeleteCategory} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
