import React, { useState } from 'react';
import './categoriesPage.css'; // Custom styles

const AddCategoryForm = ({ onAddCategory }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('I');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCategory({ name, type, description, enabled: true });
    setName('');
    setType('I');
    setDescription('');
  };

  return (
    <form className="add-category-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Category Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="type">Category Type</label>
        <select id="type" value={type} onChange={(e) => setType(e.target.value)} required>
          <option value="I">Income</option>
          <option value="E">Expense</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Add Category</button>
    </form>
  );
};

export default AddCategoryForm;
