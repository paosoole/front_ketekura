// src/components/Header.jsx
import React from 'react'
import { NavLink } from 'react-router-dom'


export default function Header() {
return (
<header className="bg-white shadow-sm">
<div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold">K</div>
<div>
<div className="font-semibold">Ketekura</div>
<div className="text-xs text-gray-500">Gestión clínica</div>
</div>
</div>
<nav className="flex items-center gap-4">
<NavLink to="/patients" className={({isActive}) => isActive ? 'text-indigo-600 font-medium' : 'text-gray-600'}>Pacientes</NavLink>
<NavLink to="/doctors" className={({isActive}) => isActive ? 'text-indigo-600 font-medium' : 'text-gray-600'}>Médicos</NavLink>
<NavLink to="/attendances" className={({isActive}) => isActive ? 'text-indigo-600 font-medium' : 'text-gray-600'}>Atenciones</NavLink>
<NavLink to="/payments" className={({isActive}) => isActive ? 'text-indigo-600 font-medium' : 'text-gray-600'}>Pagos</NavLink>
</nav>
</div>
</header>
)
}