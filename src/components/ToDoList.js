import React, { useState } from 'react';
import './ToDoList.css';

// Utility function to format date and time
const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true // Use 24-hour format
    };
    return dateTime.toLocaleString('en-US', options);
};

// ToDoList component
const ToDoList = ({ tasks, onDeleteTask, updateTasks }) => {
    const [openCategory, setOpenCategory] = useState(null);

    const categories = [...new Set(tasks.map(task => task.category))];

    const toggleCategory = (category) => {
        console.log('Toggle category:', category);
        if (openCategory === category) {
            setOpenCategory(null);
        } else {
            setOpenCategory(category);
        }
    };

    const toggleTaskStatus = (taskToUpdate) => {
        console.log('Updating task:', taskToUpdate);

        const updatedTasks = tasks.map(task =>
            task.id === taskToUpdate.id ? { ...task, status: task.status === 'complete' ? 'incomplete' : 'complete' } : task
        );
        updateTasks(updatedTasks);
    };

    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    return (
        <div className="todo-list-container">
            {categories.map((category, index) => (
                <div key={category}
                     className={`category-${category.toLowerCase()}-container ${openCategory === category ? 'open' : ''}`}
                     onClick={() => toggleCategory(category)}>
                    <h2>{`${category}`}</h2>
                    {openCategory === category && (
                        <>
                            <ul className={`category-${category.toLowerCase()}-list`} onClick={stopPropagation}>
                                {tasks
                                    .filter(task => task.category === category)
                                    .map((task, index) => (
                                        <li key={index} className={`category-${category.toLowerCase()}-item ${task.status === 'complete' ? 'completed' : ''} ${task.priority.toLowerCase()}`}>
                                            <div>
                                                {/* Render checkbox to toggle task status */}
                                                <input type="checkbox"
                                                       checked={task.status === 'complete'}
                                                       onChange={() => toggleTaskStatus(task)}/>
                                            </div>
                                            <div>{task.task}</div>
                                            <div>{task.description}</div>
                                            <div>{formatDateTime(task.createdOn)}</div>
                                            <div>{formatDateTime(task.completeBy)}</div>
                                            <div>{task.priority}</div>
                                            <div>
                                                <i className="fa-solid fa-trash" onClick={() => onDeleteTask(task)}></i>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ToDoList;
