import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskSaved, editingTask }) => {
  const [title, setTitle] = useState('');
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
    } else {
      setTitle('');
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await axios.put(`http://localhost:8000/api/tasks/${editingTask.id}`, { title }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('http://localhost:8000/api/tasks', { title }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      onTaskSaved();
      setTitle('');
    } catch (err) {
      console.error('Erreur formulaire tâche :', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border border-orange-300 mb-6">
      <h2 className="text-xl font-bold text-orange-600 mb-4">
        {editingTask ? 'Modifier la tâche' : 'Nouvelle tâche'}
      </h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre de la tâche"
        className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />
      <button type="submit" className="w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
        {editingTask ? 'Mettre à jour' : 'Ajouter'}
      </button>
    </form>
  );
};

export default TaskForm;
