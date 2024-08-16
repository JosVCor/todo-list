import React from 'react';
import './ToDoList.css';
import AddToDoForm from "./AddToDoForm";
import SideBar from "./SideBar";

const ToDoList = ({ tasks, setTasks, deleteTask, categories, setCategories }) => {

    const [showForm, setShowForm] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [sortOrder, setSortOrder] = React.useState('asc');
    const [completeBySortOrder, setCompleteBySortOrder] = React.useState('asc');
    const [activeSortField, setActiveSortField] = React.useState('createdOn'); // New state for active sort field

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'High':
                return 'high-priority';
            case 'Medium':
                return 'medium-priority';
            case 'Low':
                return 'low-priority';
            default:
                return '';
        }
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleStatusChange = (taskId) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId
                ? { ...task, status: task.status === 'Incomplete' ? 'Complete' : 'Incomplete' }
                : task
        );
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const handleSort = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        setActiveSortField('createdOn'); // Set active sort field to "Created on"
    };

    const handleCompleteBySort = () => {
        const newSortOrder = completeBySortOrder === 'asc' ? 'desc' : 'asc';
        setCompleteBySortOrder(newSortOrder);
        setActiveSortField('completeBy'); // Set active sort field to "Complete by"
    };

    const sortedTasks = [...tasks].sort((a, b) => {
        if (activeSortField === 'createdOn') {
            if (sortOrder === 'asc') {
                return new Date(a.createdOn) - new Date(b.createdOn);
            } else {
                return new Date(b.createdOn) - new Date(a.createdOn);
            }
        } else if (activeSortField === 'completeBy') {
            if (completeBySortOrder === 'asc') {
                return new Date(a.completeBy) - new Date(b.completeBy);
            } else {
                return new Date(b.completeBy) - new Date(a.completeBy);
            }
        }
        return 0;
    });

    const filteredTasks = selectedCategory
        ? sortedTasks.filter(task => task.category === selectedCategory)
        : sortedTasks;

    return (
        <div className="todo-list-container">
            <div className="todo-list-card">
                <SideBar
                    categories={categories}
                    setCategories={setCategories}
                    selectedCategory={null}
                    onCategorySelect={handleCategorySelect}
                />
                <div className="header-item-container">
                    <div className="grid-container-header">
                        <div className="grid-item-header">
                            <h4>Status</h4>
                            <h4>Task</h4>
                            <h4>Description</h4>
                            <h4 onClick={handleSort} style={{cursor: 'pointer'}}>
                                Created on {sortOrder === 'asc' ? '↑' : '↓'}
                            </h4>
                            <h4 onClick={handleCompleteBySort} style={{cursor: 'pointer'}}>
                                Complete by {completeBySortOrder === 'asc' ? '↑' : '↓'}
                            </h4>
                            <button className="add-button" onClick={() => setShowForm(!showForm)}>
                                <i className="fa-solid fa-plus"></i>
                            </button>
                        </div>
                    </div>

                    <div className="task-container">
                        {filteredTasks.length > 0 ? filteredTasks.map((task) => (
                            <div key={task.id} className={`task-container-card ${getPriorityClass(task.priority)}`}>
                                <div className="grid-container">
                                    <div className="grid-container-body">
                                        <div className="grid-item">
                                            <input
                                                className="task-checkbox"
                                                type="checkbox"
                                                checked={task.status === 'Complete'}
                                                onChange={() => handleStatusChange(task.id)}
                                            />
                                            <p className={task.status === 'Complete' ? 'task-complete' : ''}>
                                                {task.task}
                                            </p>
                                            <p className={task.status === 'Complete' ? 'task-complete' : ''}>
                                                {task.description}
                                            </p>
                                            <p className={task.status === 'Complete' ? 'task-complete' : ''}>
                                                {new Date(task.createdOn).toLocaleString()}
                                            </p>
                                            <p className={task.status === 'Complete' ? 'task-complete' : ''}>
                                                {new Date(task.completeBy).toLocaleString()}
                                            </p>
                                            <button
                                                className="delete-button"
                                                onClick={() => deleteTask(task.id)}
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : <p>No tasks available</p>}
                    </div>
                </div>
            </div>
            <AddToDoForm
                tasks={tasks}
                setTasks={setTasks}
                showForm={showForm}
                setShowForm={setShowForm}
                categories={categories}
                setCategories={setCategories}
            />
        </div>
    );
};

export default ToDoList;
