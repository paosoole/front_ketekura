// src/components/ui/Sidebar.jsx
import React from 'react'
import { NavLink } from 'react-router-dom'


const Item = ({to, children}) => (
<NavLink to={to} className={({isActive}) => `w-full block px-4 py-3 rounded-md mb-1 ${isActive? 'bg-ketekuraLight text-ketekuraBlue' : 'text-gray-700 hover:bg-white hover:shadow'}`}>
{children}
</NavLink>
)


export default function Sidebar(){
return (
<aside className="w-64 bg-white border-r shadow-sm p-4 hidden md:block">
<div className="mb-6">
<div className="w-full text-center">
<div className="mx-auto w-20 h-20 rounded-lg bg-gradient-to-br from-ketekuraBlue to-ketekuraAccent flex items-center justify-center text-white font-bold text-2xl">K</div>
</div>
</div>
<nav>
<Item to="/pacientes">Pacientes</Item>
<Item to="/medicos">Médicos</Item>
<Item to="/recetas">Recetas</Item>
<Item to="/pagos">Pagos</Item>
</nav>
</aside>
)
}