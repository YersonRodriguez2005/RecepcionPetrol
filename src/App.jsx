import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import TablaConductores from './components/TablaConductores';
import TablaDotacion from './components/TablaPrecioDotacion';
import TablaExamenes from './components/TablaPrecioExamenes';
import AuthWrapper from './components/AuthWrapper';

const App = () => {
  return (
    <AuthWrapper>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/conductores" />} />
        <Route path="/conductores" element={<TablaConductores />} />
        <Route path="/dotacion" element={<TablaDotacion />} />
        <Route path="/examenes" element={<TablaExamenes />} />
      </Routes>
    </AuthWrapper>
  );
};

export default App;
