import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './AddToDoForm.css';

const AddToDoForm = ({ tasks, setTasks, showForm, setShowForm, categories = [], setCategories }) => {
    const [selectedCategory, setSelectedCategory] = useState(''); // For selected category from dropdown
    const [highPriority, setHighPriority] = useState(false);
    const [mediumPriority, setMediumPriority] = useState(false);
    const [lowPriority, setLowPriority] = useState(false);
    const [selectedInterval, setSelectedInterval] = useState(30); // Default to 30 minutes
    const [newTask, setNewTask] = useState({
        task: '',
        description: '',
        category: '',
        createdOn: '',
        completeBy: '',
        priority: '',
        status: 'Incomplete'
    });

    const handleHighPriorityChange = () => {
        setHighPriority(!highPriority);
    };

    const handleMediumPriorityChange = () => {
        setMediumPriority(!mediumPriority);
    };

    const handleLowPriorityChange = () => {
        setLowPriority(!lowPriority);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleInputChange = (event) => {
        setNewTask({
            ...newTask,
            [event.target.name]: event.target.value
        });
    };

    const handleIntervalChange = (event) => {
        setSelectedInterval(parseInt(event.target.value));
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        const priority = highPriority ? 'High' : (mediumPriority ? 'Medium' : (lowPriority ? 'Low' : ''));
        const taskWithPriority = {
            ...newTask,
            priority: priority,
            category: selectedCategory,
            id: uuidv4()
        };

        setTasks([...tasks, taskWithPriority]);

        localStorage.setItem('tasks', JSON.stringify([...tasks, taskWithPriority]));

        setNewTask({
            task: '',
            description: '',
            category: '',
            createdOn: '',
            completeBy: '',
            priority: '',
            status: 'Incomplete'
        });
        setHighPriority(false);
        setMediumPriority(false);
        setLowPriority(false);
        setShowForm(false);

        // Schedule alert
        scheduleAlerts(taskWithPriority, selectedInterval);
    };

    const scheduleAlerts = (task, intervalInMinutes) => {
        const now = new Date();
        const completeBy = new Date(task.completeBy);

        if (now < completeBy) {
            const intervalTime = intervalInMinutes * 60 * 1000; // Convert minutes to milliseconds
            if (intervalInMinutes === 0) {
                // Special case for 10 seconds
                setTimeout(() => {
                    alert(`Task "${task.task}" is due soon!`);
                }, 10000); // 10 seconds in milliseconds
            } else {
                const intervalId = setInterval(() => {
                    const timeRemaining = new Date(task.completeBy) - new Date();
                    if (timeRemaining <= intervalTime) {
                        alert(`Task "${task.task}" is due soon!`);
                    }
                    if (timeRemaining <= 0) {
                        clearInterval(intervalId); // Stop the interval when the task is due
                    }
                }, intervalTime);
            }
        }
    };

    useEffect(() => {
        tasks.forEach(task => scheduleAlerts(task, selectedInterval));
    }, [tasks, selectedInterval]);

    useEffect(() => {
        console.log('Categories:', categories);
        if (!categories.includes(selectedCategory)) {
            setSelectedCategory('');
        }
    }, [categories, selectedCategory]);

    return (
        <div>
            {showForm && (
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-card">
                        <div className="form-card-title">
                            <h1>Add Task</h1>
                        </div>
                        <div className="form-input-container">
                            <div className="form-input-col-1">
                                <div>
                                    <input className="task-input"
                                           type="text"
                                           placeholder="Task"
                                           name="task"
                                           value={newTask.task}
                                           onChange={handleInputChange}/>
                                </div>
                                <div>
                                    <input
                                        className="description-input"
                                        type="text"
                                        placeholder="Description"
                                        name="description"
                                        value={newTask.description}
                                        onChange={handleInputChange}/>
                                </div>

                                {/* Existing Categories Dropdown */}
                                <div>
                                    <select
                                        className="category-input"
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}
                                    >
                                        <option value="">Select a category</option>
                                        {categories && categories.length > 0 && categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-input-col-2">
                                <div className="input-container">
                                    <input type="datetime-local"
                                           className="tooltip-input creation-input"
                                           placeholder="Created on"
                                           name="createdOn"
                                           value={newTask.createdOn}
                                           onChange={handleInputChange}
                                           title="Created on"/>
                                </div>
                                <div className="input-container">
                                    <input type="datetime-local"
                                           className="tooltip-input completion-input"
                                           placeholder="Complete by"
                                           name="completeBy"
                                           value={newTask.completeBy}
                                           onChange={handleInputChange}
                                           title="Complete by"/>
                                </div>
                                <div className="status-input">
                                    <div>
                                        <input
                                            type="checkbox"
                                            checked={newTask.status === 'Incomplete'}
                                            onChange={() => {
                                                setNewTask({
                                                    ...newTask,
                                                    status: newTask.status === 'Incomplete' ? 'Complete' : 'Incomplete'
                                                });
                                            }}/>
                                    </div>
                                    <div>
                                        <p>Incomplete</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-priority">
                            <p>Priority</p>
                            <div className="priority-checkboxes">
                                <div>
                                    <input
                                        type="checkbox"
                                        className="priority-input"
                                        checked={highPriority}
                                        onChange={handleHighPriorityChange}
                                    />
                                    <p>High</p>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        className="priority-input"
                                        checked={mediumPriority}
                                        onChange={handleMediumPriorityChange}
                                    />
                                    <p>Medium</p>
                                </div>
                                <div>
                                    <input
                                        type="checkbox"
                                        className="priority-input"
                                        checked={lowPriority}
                                        onChange={handleLowPriorityChange}
                                    />
                                    <p>Low</p>
                                </div>
                            </div>
                        </div>

                        {/* Interval Selection */}
                        <div className="form-interval">
                            <p>Alert Interval</p>
                            <select className="interval-input" value={selectedInterval} onChange={handleIntervalChange}>
                                <option value={0}>10 seconds (Test)</option>
                                <option value={30}>30 minutes</option>
                                <option value={60}>1 hour</option>
                            </select>
                        </div>

                        <div className="form-button">
                            <button type="submit">Add To Do</button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default AddToDoForm;
