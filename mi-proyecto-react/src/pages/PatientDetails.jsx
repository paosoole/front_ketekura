// src/pages/PatientDetails.jsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../api'


export default function PatientDetails() {
const { id } = useParams()
const [patient, setPatient] = useState(null)
const [records, setRecords] = useState([])


useEffect(()=>{ load() }, [id])


async function load(){
try{
const p = await api.getPatient(id)
setPatient(p)
const mr = await api.medicalRecords({ patientId: id })
setRecords(mr.data || [])
}catch(err){
console.error(err)
alert('Error cargando paciente')
}
}


if(!patient) return <div className="p-6 bg-white rounded shadow">Cargando paciente...</div>


return (
<div className="space-y-6">
<div className="bg-white p-4 rounded shadow">
<h2 className="text-xl font-semibold">{patient.fullName || patient.name}</h2>
<div className="mt-2 text-sm text-gray-600">Documento: {patient.document} - Tel: {patient.phone}</div>
</div>


<div className="bg-white p-4 rounded shadow">
<h3 className="font-medium">Registros médicos (recetas, exámenes, atenciones)</h3>
{records.length === 0 ? <div className="text-sm text-gray-500 mt-2">No hay registros.</div> : (
<ul className="mt-3 space-y-2">
{records.map(r=> (
<li key={r._id} className="border rounded p-3">
<div className="text-sm font-medium">{r.type} - {new Date(r.date).toLocaleString()}</div>
<div className="text-sm text-gray-700 mt-1">{r.summary || JSON.stringify(r.content).slice(0,200)}</div>
</li>
))}
</ul>
)}
</div>
</div>
)
}