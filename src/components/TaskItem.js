import React from 'react';
import axios from 'axios';

const TaskItem = ({ task }) => {
  const toggleCompleted = () => {
    axios.put(`http://localhost:5000/tasks/${task.id}`)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  const deleteTask = () => {
    axios.delete(`http://localhost:5000/tasks/${task.id}`)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  return (
    <li>
      <input type="checkbox" checked={task.completed} onChange={toggleCompleted} />
      <strong>{task.title}</strong> - {task.description}
      <button onClick={deleteTask}>Delete</button>
    </li>
  );
};

export default TaskItem;
