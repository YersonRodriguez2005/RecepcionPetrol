import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import TablaConductores from './components/TablaConductores';
import TablaDotacion from './components/TablaPrecioDotacion';
import TablaExamenes from './components/TablaPrecioExamenes';
import TablaComidaPerros from './components/SegPerros';
import Pedidos from './components/Pedidos';
import AuthWrapper from './components/AuthWrapper';
import Relation from './components/Relation';
import Ordenes from './components/Ordenes';

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
    <div 
      className="flex flex-col items-center justify-center h-screen"
      style={{ backgroundColor: '#373739' }}
    >
      <div 
        className="p-8 rounded-xl border shadow-lg"
        style={{ 
          backgroundColor: '#191913', 
          borderColor: '#020202' 
        }}
      >
        <h2 
          className="mb-6 text-xl font-bold text-center"
          style={{ color: '#c9b977' }}
        >
          Ingrese la contraseña para acceder
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="border rounded-lg px-4 py-3 w-full min-w-64 focus:ring-2 focus:ring-opacity-50 focus:outline-none"
            style={{ 
              backgroundColor: '#020202',
              borderColor: '#ecdda2',
              color: '#ecdda2'
            }}
          />
          <button 
            type="submit" 
            className="w-full px-6 py-3 rounded-lg font-bold text-black hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#c9b977' }}
          >
            Ingresar
          </button>
        </form>
      </div>
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
        <Route
          path="/relacion"
          element={
            <ProtectedRoute correctPassword={pedidosPassword}>
              <Relation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ordenes"
          element={
            <ProtectedRoute correctPassword={pedidosPassword}>
              <Ordenes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthWrapper>
  );
};

export default App;