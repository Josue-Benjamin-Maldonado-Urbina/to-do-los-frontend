import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  return (
    <div>
      <h1>To-Do List</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;
