// src/pages/Attendances.jsx
import React, { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import { api } from '../api'


export default function Attendances(){
const [data, setData] = useState([])
const [loading, setLoading] = useState(false)


useEffect(()=>{ load() }, [])
async function load(){
try{ setLoading(true); const res = await api.listAttendances({ page:1, limit:50 }); setData(res.data || []) }
catch(e){ console.error(e); alert('Error cargando atenciones') } finally{ setLoading(false) }
}


const cols = [
{ key: 'id', title: 'ID' },
{ key: 'date', title: 'Fecha', render: r => new Date(r.date).toLocaleString() },
{ key: 'patientName', title: 'Paciente', render: r => r.patientName || r.patient?.fullName },
{ key: 'doctorName', title: 'Médico', render: r => r.doctorName || r.doctor?.fullName },
{ key: 'notes', title: 'Notas' }
]


return (
<section>
<div className="flex items-center justify-between mb-4">
<div>
<h1 className="text-2xl font-semibold">Atenciones</h1>
<p className="text-sm text-gray-500">Historial de atenciones (incluye datos en MongoDB cuando aplique).</p>
</div>
</div>


{loading ? <div className="p-6 bg-white rounded shadow text-center">Cargando...</div> : (
<DataTable columns={cols} data={data} />
)}
</section>
)
}