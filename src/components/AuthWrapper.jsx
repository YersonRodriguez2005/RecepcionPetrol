// components/AuthWrapper.jsx
import React, { useState } from 'react';

const AuthWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'Petrol1234*') {
      setIsAuthenticated(true);
    } else {
      alert('Contraseña incorrecta');
    }
  };

  if (!isAuthenticated) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#373739' }}
      >
        <form 
          onSubmit={handleLogin} 
          className="p-8 rounded-xl shadow-lg border max-w-md w-full mx-4"
          style={{ 
            backgroundColor: '#191913', 
            borderColor: '#020202' 
          }}
        >
          <h2 
            className="text-2xl font-bold mb-6 text-center"
            style={{ color: '#c9b977' }}
          >
            Acceso Restringido
          </h2>
          <input
            type="password"
            placeholder="Ingresa la contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg px-4 py-3 w-full mb-6 focus:ring-2 focus:ring-opacity-50 focus:outline-none"
            style={{ 
              backgroundColor: '#020202',
              borderColor: '#ecdda2',
              color: '#ecdda2'
            }}
          />
          <button 
            type="submit" 
            className="w-full px-4 py-3 rounded-lg font-bold text-black hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#c9b977' }}
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;