//import React from 'react';
import React, { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await api.post("/login", { email, password });

        console.log(response.data);

        // Stocker le token
        localStorage.setItem("auth_token", response.data.token);
  
        // Rediriger vers le dashboard ou autre
        navigate("/dashboard");
      } catch (error) {
        console.error(error);
        alert("Échec de la connexion");
      }
    };
    

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Partie gauche avec image ou texte fort */}
        <div className="bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80')] text-white flex flex-col justify-center items-center p-10">
          <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">Ravi de vous revoir !</h2>
          <p className="text-lg drop-shadow">Connectez-vous pour accéder à votre espace.</p>
        </div>

        {/* Partie droite avec formulaire */}
        <div className="p-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Connexion</h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block  text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none "
                placeholder="Votre email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Mot de passe"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
            >
              Se connecter
            </button>
            <p className="text-sm text-center text-gray-600 mt-4">
              Pas encore de compte ?{' '}
              <a href="/register" className="text-indigo-600 hover:underline">
                Créez-en un ici
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}