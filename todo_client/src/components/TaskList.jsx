import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';

const TaskList = ({ onEdit, refresh }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const token = localStorage.getItem('auth_token');

  const fetchTasks = React.useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data.tasks);
    } catch (err) {
      console.error('Erreur chargement tâches :', err);
    }
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [refresh, fetchTasks]);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-2 mb-2">
        <button onClick={() => setFilter('all')} className="text-sm px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">Toutes</button>
        <button onClick={() => setFilter('active')} className="text-sm px-3 py-1 bg-orange-300 rounded hover:bg-orange-400">Actives</button>
        <button onClick={() => setFilter('completed')} className="text-sm px-3 py-1 bg-green-300 rounded hover:bg-green-400">Terminées</button>
      </div>
      {filteredTasks.length === 0 ? (
        <p className="text-gray-500">Aucune tâche trouvée.</p>
      ) : (
        filteredTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={fetchTasks}
            onToggle={fetchTasks}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
