import React from 'react';
import axios from 'axios';

const TaskItem = ({ task, onEdit, onDelete, onToggle }) => {
  const token = localStorage.getItem('auth_token');

  const handleDelete = async () => {
    await axios.delete(`http://localhost:8000/api/tasks/${task.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    onDelete();
  };

  const handleToggle = async () => {
    await axios.patch(`http://localhost:8000/api/tasks/${task.id}/toggle`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    onToggle();
  };

  return (
    <div className={`flex justify-between items-center p-4 rounded-lg shadow border ${task.completed ? 'bg-gray-100 line-through' : 'bg-white'}`}>
      <span>{task.title}</span>
      <div className="space-x-2">
        <button onClick={() => onEdit(task)} className="bg-yellow-400 text-white px-3 py-1 rounded">✏</button>
        <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded">🗑</button>
        <button onClick={handleToggle} className="bg-green-500 text-white px-3 py-1 rounded">
          {task.completed ? '↩' : '✔'}
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
