import React from 'react';
import './categoriesPage.css';

const CategoryItem = ({ category, onDelete }) => {
    return (
        <div className="category-item">
            <div className="category-item-text">
                <h6>{category.name}</h6>
                <p>{category.description}</p>
            </div>
            <button className="delete-button" onClick={() => onDelete(category.id)}>
                Delete
            </button>
        </div>
    );
};

export default CategoryItem;
