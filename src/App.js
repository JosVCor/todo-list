// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import ToDoList from "./components/ToDoList";
import AddToDoForm from "./components/AddToDoForm";

function App() {
    // Load tasks from local storage or set an empty array if there are no tasks
    const [tasks, setTasks] = useState(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        return storedTasks || [];
    });

    // Update local storage whenever tasks change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleDeleteTask = (taskToDelete) => {
        const updatedTasks = tasks.filter(task => task !== taskToDelete);
        setTasks(updatedTasks);
    }

    const handleUpdateTasks = (updatedTasks) => {
        setTasks(updatedTasks);
    }

    return (
        <div className="App">
            <h1>Life Organizer</h1>
            <ToDoList tasks={tasks} onDeleteTask={handleDeleteTask} updateTasks={handleUpdateTasks} />
            <AddToDoForm tasks={tasks} setTasks={setTasks} />
        </div>
    );
}

export default App;
