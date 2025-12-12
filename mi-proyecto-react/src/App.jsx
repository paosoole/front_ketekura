// src/App.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Patients from './pages/Patients'
import Doctors from './pages/Doctors.jsx'
import Attendances from './pages/Attendances'
import Payments from './pages/Payments'
import PatientDetails from './pages/PatientDetails'


export default function App() {
return (
<div className="min-h-screen bg-gray-50 text-gray-800">
<Header />
<main className="p-6 max-w-6xl mx-auto">
<Routes>
<Route path="/" element={<Navigate to="/patients" replace />} />
<Route path="/patients" element={<Patients />} />
<Route path="/patients/:id" element={<PatientDetails />} />
<Route path="/doctors" element={<Doctors />} />
<Route path="/attendances" element={<Attendances />} />
<Route path="/payments" element={<Payments />} />
</Routes>
</main>
</div>
)
}