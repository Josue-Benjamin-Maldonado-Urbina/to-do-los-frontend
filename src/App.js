import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!title || !description) {
      alert("Campos vacíos: añada algo.");
      return;
    }

    const newTask = { title, description };

    try {
      const response = await axios.post("http://127.0.0.1:5000/tasks", newTask);

      if (response.status === 201) {
        setTasks((prevTasks) => [...prevTasks, response.data]);
        setTitle(""); 
        setDescription(""); 
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/tasks/${taskId}`);
      
      if (response.status === 200) {
        setTasks(tasks.filter((task) => task.id !== taskId)); 
      } else {
        console.error("Error al eliminar una tarea");
      }
    } catch (error) {
      console.error("Error al eliminar una tarea:", error);
    }
  };

  const handleCheckTask = async (taskId) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

    try {
      const response = await axios.put(`http://127.0.0.1:5000/tasks/${taskId}`, updatedTask);

      if (response.status === 200) {
        setTasks(
          tasks.map((task) =>
            task.id === taskId ? { ...task, completed: updatedTask.completed } : task
          )
        );
      } else {
        console.error("Error al cargar tarea");
      }
    } catch (error) {
      console.error("Error al cargar tarea:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>

      <div className="flex mb-4 space-x-4">
        <input
          type="text"
          className="w-1/3 p-2 border border-gray-300 rounded"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="w-1/3 p-2 border border-gray-300 rounded"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}  // Usamos el `task.id` como la clave única
            className="flex justify-between items-center bg-gray-100 p-4 rounded"
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCheckTask(task.id)}
                className="form-checkbox"
              />
              <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p>{task.description}</p>
              </div>
            </div>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
