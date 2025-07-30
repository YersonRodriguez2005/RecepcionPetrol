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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md">
          <h2 className="text-xl font-bold mb-4">Acceso restringido</h2>
          <input
            type="password"
            placeholder="Ingresa la contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
            Entrar
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;
