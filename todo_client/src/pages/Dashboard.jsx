import React, { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('auth_token');

  const getUserInfo = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Erreur utilisateur :", err);
      navigate("/login");
    }
  };

  useEffect(() => {
    getUserInfo();
  }, );

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/login');
  };

  const handleTaskSaved = () => {
    setEditingTask(null);
    setShowForm(false);
    setRefresh(!refresh);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  return (
    <div className="flex min-h-screen bg-orange-50">
      {/* Sidebar */}
      <aside className="w-64 bg-orange-600 text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-6">🧡 MonApp</h1>
          <div className="mb-6">
            <p className="text-sm">Connecté :</p>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm opacity-80">{user.email}</p>
          </div>
          <nav>
            <button className="text-left w-full hover:text-orange-200">📋 Tâches</button>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="bg-white text-orange-600 font-semibold py-2 px-4 rounded hover:bg-orange-100"
        >
          Déconnexion
        </button>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-orange-600">Mes tâches</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              {showForm ? 'Fermer' : '➕ Ajouter une tâche'}
            </button>
          </div>

          {showForm && (
            <TaskForm onTaskSaved={handleTaskSaved} editingTask={editingTask} />
          )}

          <TaskList onEdit={handleEdit} refresh={refresh} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
