// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import PatientDetails from './pages/PatientDetails';
import Doctors from './pages/Doctors';
import Attendances from './pages/Attendances';
import Payments from './pages/Payments';
import Recipes from './pages/Recipes';
import RecipesDetails from './pages/RecipeDetails';

export default function App() {
  return (
    <Routes>

      {/* Redirección al dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Pacientes */}
      <Route path="/pacientes" element={<Patients />} />
      <Route path="/pacientes/:id" element={<PatientDetails />} />

      {/* Médicos */}
      <Route path="/medicos" element={<Doctors />} />

      {/* Atenciones */}
      <Route path="/atenciones" element={<Attendances />} />

      {/* Pagos */}
      <Route path="/pagos" element={<Payments />} />

      {/*Recetas*/}
      <Route path="/recetas/:rut" element={<Recipes />} />
      <Route path="/recetas/detalle/:id" element={<RecipesDetails />} />

    </Routes>
  );
}
