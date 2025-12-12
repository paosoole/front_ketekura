// src/pages/Doctors.jsx
import React, { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import { api } from '../api'


export default function Doctors(){
const [doctors, setDoctors] = useState([])
const [loading, setLoading] = useState(false)


useEffect(()=>{ load() }, [])
async function load(){
try{
setLoading(true)
const res = await api.listDoctors({ page:1, limit:50 })
setDoctors(res.data || [])
}catch(e){ console.error(e); alert('Error cargando medicos') }finally{ setLoading(false) }
}


const cols = [
{ key: 'id', title: 'ID' },
{ key: 'name', title: 'Nombre', render: r => r.fullName || r.name },
{ key: 'specialty', title: 'Especialidad' },
{ key: 'email', title: 'Email' }
]


return (
<section>
<div className="flex items-center justify-between mb-4">
<div>
<h1 className="text-2xl font-semibold">Médicos</h1>
<p className="text-sm text-gray-500">Listado de profesionales.</p>
</div>
</div>


{loading ? <div className="p-6 bg-white rounded shadow text-center">Cargando...</div> : (
<DataTable columns={cols} data={doctors} />
)}
</section>
)
}