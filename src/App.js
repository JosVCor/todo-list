import React, { useState, useEffect } from 'react';
import './App.css';
import ToDoList from "./components/ToDoList";
import AddToDoForm from "./components/AddToDoForm";
import SideBar from "./components/SideBar";

function App() {
    // Load tasks from local storage or set an empty array if there are no tasks
    const [tasks, setTasks] = useState(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        return storedTasks || [];
    });

    const [categories, setCategories] = useState(() => {
        const storedCategories = JSON.parse(localStorage.getItem('categories'));
        return storedCategories || [];
    });

    // Update local storage whenever tasks or categories change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem('categories', JSON.stringify(categories));
    }, [categories]);

    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
    };

    return (
        <div className="App">
            <h1>Life Organizer</h1>
            <ToDoList  tasks={tasks}
                       setTasks={setTasks}
                       deleteTask={handleDeleteTask}
                       categories={categories}
                       setCategories={setCategories}  />
            <AddToDoForm tasks={tasks}
                         setTasks={setTasks}
                         categories={categories}
                         setCategories={setCategories}  />
        </div>
    );
}

export default App;
