// AddToDoForm.js
import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import './AddToDoForm.css';

const AddToDoForm = ({tasks, setTasks}) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [highPriority, setHighPriority] = useState(false);
    const [mediumPriority, setMediumPriority] = useState(false);
    const [lowPriority, setLowPriority] = useState(false);
    const [newTask, setNewTask] = useState({
        task: '',
        description: '',
        category: '',
        createdOn: '',
        completeBy: '',
        priority: '',
        status: 'Incomplete'
    });

    const categories = ['Mind', 'Body', 'Soul', 'Heart'];

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
        console.log(event.target.value)
    };

    const handleInputChange = (event) => {
        setNewTask({
            ...newTask,
            [event.target.name]: event.target.value
        });
    };

    const handleButtonClick = () => {
        setShowForm(!showForm);
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
        console.log("Task with Priority:", taskWithPriority); // Log the task with priority
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
        console.log("Tasks after adding new task:", tasks); // Log the tasks after adding the new task
        console.log("Form submitted");
        setShowForm(false);
    };


    return (
        <div>
            <button className="add-button" onClick={handleButtonClick}> .</button>
            {showForm && (
                <form className="form" onSubmit={handleSubmit}>

                    <div className="form-card">

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

                                <div>
                                    <select
                                        className="category-input"
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}>

                                        <option value="">Select a category</option>
                                        {categories.map(category => (
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
                        <div className="form-button">
                            <button type="submit">Add To Do</button>
                        </div>
                    </div>
                    <div className="form-shadow"></div>
                </form>
            )}
        </div>
    );
};

export default AddToDoForm;