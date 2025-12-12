// src/pages/Payments.jsx
import React, { useEffect, useState } from 'react'
import DataTable from '../components/DataTable'
import { api } from '../api'


export default function Payments(){
const [data, setData] = useState([])
const [loading, setLoading] = useState(false)


useEffect(()=>{ load() }, [])
async function load(){
try{ setLoading(true); const res = await api.listPayments({ page:1, limit:50 }); setData(res.data || []) }
catch(e){ console.error(e); alert('Error cargando pagos') } finally{ setLoading(false) }
}


const cols = [
{ key: 'id', title: 'ID' },
{ key: 'date', title: 'Fecha', render: r=> new Date(r.date).toLocaleDateString() },
{ key: 'patient', title: 'Paciente', render: r=> r.patientName || r.patient?.fullName },
{ key: 'amount', title: 'Monto', render: r => `$ ${r.amount}` },
{ key: 'status', title: 'Estado' }
]


return (
<section>
<div className="flex items-center justify-between mb-4">
<div>
<h1 className="text-2xl font-semibold">Pagos</h1>
<p className="text-sm text-gray-500">Información de los pagos asociados a atenciones y pacientes.</p>
</div>
</div>


{loading ? <div className="p-6 bg-white rounded shadow text-center">Cargando...</div> : (
<DataTable columns={cols} data={data} />
)}
</section>
)
}