import React from 'react';
import './SideBar.css';
import AddCategory from "./AddCategory";

const SideBar = ({ categories = [], setCategories, selectedCategory, onCategorySelect }) => {

    const onDeleteCategory = (categoryToDelete) => {
        const updatedCategories = categories.filter(category => category !== categoryToDelete);
        setCategories(updatedCategories);

        // Optionally, remove the selected category if it's deleted
        if (selectedCategory === categoryToDelete) {
            onCategorySelect(null);
        }

        // Update local storage if you're saving categories there
        localStorage.setItem('categories', JSON.stringify(updatedCategories));
    };

    return (
        <div className="sidebar-container">
            <div>
                <AddCategory categories={categories} setCategories={setCategories} />
                <ul className="categories-list">
                    {categories.map(category => (
                        <li
                            key={category}
                            className={selectedCategory === category ? 'selected' : ''}
                        >
                            <span onClick={() => onCategorySelect(category)}>
                                {category}
                            </span>
                            <button
                                className="delete-category-button"
                                onClick={() => onDeleteCategory(category)}
                            >
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SideBar;
