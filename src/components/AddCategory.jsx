import React, { useState } from 'react';
import './AddCategory.css';

const AddCategory = ({ categories, setCategories }) => {
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = () => {
        if (newCategory && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
            setNewCategory('');
        }
    };

    return (
        <div className="add-category-container">
            <input
                className="add-category-input"
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Add new category"
            />
            <button className="add-category-button" onClick={handleAddCategory}><i className="fa-solid fa-plus"></i></button>
        </div>
    );
};

export default AddCategory;
