import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import TablaConductores from './components/TablaConductores';
import TablaDotacion from './components/TablaPrecioDotacion';
import TablaExamenes from './components/TablaPrecioExamenes';
import TablaComidaPerros from './components/SegPerros';
import Pedidos from './components/Pedidos';
import AuthWrapper from './components/AuthWrapper';

// Componente wrapper reutilizable para rutas protegidas
const ProtectedRoute = ({ children, correctPassword }) => {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthorized(true);
    } else {
      alert('Contraseña incorrecta');
      setPassword('');
    }
  };

  if (isAuthorized) return children;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="mb-4 text-xl font-bold">Ingrese la contraseña para acceder</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="mb-2 border rounded p-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Ingresar
        </button>
      </form>
    </div>
  );
};

const App = () => {
  const dotacionPassword = '1234*';
  const examenesPassword = '1234*';
  const comidaPerrosPassword = '1234*';
  const pedidosPassword = '1234*';

  return (
    <AuthWrapper>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/conductores" />} />
        <Route path="/conductores" element={<TablaConductores />} />

        <Route
          path="/dotacion"
          element={
            <ProtectedRoute correctPassword={dotacionPassword}>
              <TablaDotacion />
            </ProtectedRoute>
          }
        />

        <Route
          path="/examenes"
          element={
            <ProtectedRoute correctPassword={examenesPassword}>
              <TablaExamenes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/comida-perros"
          element={
            <ProtectedRoute correctPassword={comidaPerrosPassword}>
              <TablaComidaPerros />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pedidos"
          element={
            <ProtectedRoute correctPassword={pedidosPassword}>
              <Pedidos />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthWrapper>
  );
};

export default App;
