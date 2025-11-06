import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import TablaConductores from './components/TablaConductores';
import TablaDotacion from './components/TablaPrecioDotacion';
import TablaExamenes from './components/TablaPrecioExamenes';
import TablaComidaPerros from './components/SegPerros';
import Pedidos from './components/Pedidos';
import AuthWrapper from './components/AuthWrapper';
import Ordenes from './components/Ordenes';
import Control from './components/ControlPapeleria';

// Componente wrapper reutilizable para rutas protegidas
const ProtectedRoute = ({ children, correctPassword, routeName }) => {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar si ya está autenticado al montar el componente
  useEffect(() => {
    const authKey = `auth_${routeName}`;
    const isAuth = sessionStorage.getItem(authKey) === 'true';
    setIsAuthorized(isAuth);
    setIsLoading(false);
  }, [routeName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      const authKey = `auth_${routeName}`;
      sessionStorage.setItem(authKey, 'true');
      setIsAuthorized(true);
    } else {
      alert('Contraseña incorrecta');
      setPassword('');
    }
  };

  // Mostrar un loading mientras verifica la autenticación
  if (isLoading) {
    return (
      <div 
        className="flex items-center justify-center h-screen"
        style={{ backgroundColor: '#373739' }}
      >
        <div className="text-xl" style={{ color: '#c9b977' }}>
          Cargando...
        </div>
      </div>
    );
  }

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
            autoFocus
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
  const dotacionPassword = 'Petrol1234*';
  const examenesPassword = 'Petrol1234*';
  const comidaPerrosPassword = 'Petrol1234*';
  const pedidosPassword = 'Petrol1234*';
  const ordenesPassword = '1234*';

  return (
    <AuthWrapper>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/conductores" />} />
        <Route path="/conductores" element={<TablaConductores />} />

        <Route
          path="/dotacion"
          element={
            <ProtectedRoute correctPassword={dotacionPassword} routeName="dotacion">
              <TablaDotacion />
            </ProtectedRoute>
          }
        />

        <Route
          path="/examenes"
          element={
            <ProtectedRoute correctPassword={examenesPassword} routeName="examenes">
              <TablaExamenes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/comida-perros"
          element={
            <ProtectedRoute correctPassword={comidaPerrosPassword} routeName="comida-perros">
              <TablaComidaPerros />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pedidos"
          element={
            <ProtectedRoute correctPassword={pedidosPassword} routeName="pedidos">
              <Pedidos />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/ordenes"
          element={
            <ProtectedRoute correctPassword={ordenesPassword} routeName="ordenes">
              <Ordenes />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/control"
          element={
            <ProtectedRoute correctPassword={ordenesPassword} routeName="control">
              <Control />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthWrapper>
  );
};

export default App;