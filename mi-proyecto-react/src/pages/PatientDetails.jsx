// src/pages/PatientDetails.jsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../api'
import Loader from '../components/ui/Loader'


export default function PatientDetails(){
const { id } = useParams()
const navigate = useNavigate()
const [patient, setPatient] = useState(null)
const [recipes, setRecipes] = useState([])
const [loading, setLoading] = useState(false)


useEffect(()=>{ load() }, [id])
async function load(){
try{
setLoading(true)
const p = await api.getPatient(id)
setPatient(p)
const r = await api.listRecipesByRut(id)
setRecipes(r.data || r || [])


}catch(err){ console.error(err); alert('Error cargando paciente') } finally{ setLoading(false) }
}


if(loading || !patient) return <Loader />


return (
<div className="space-y-6">
<div className="bg-white p-4 rounded shadow flex items-center justify-between">
<div>
<h2 className="text-xl font-semibold">{patient.fullName || `${patient.pnombre || ''} ${patient.apaterno || ''}`}</h2>
<div className="text-sm text-gray-600">RUT: {patient.pacRut || patient.id} - Tel: {patient.telefono}</div>
</div>
<div className="flex gap-2">
<button className="px-4 py-2 rounded border">Editar</button>
<button className="px-4 py-2 rounded bg-ketekuraBlue text-white" onClick={()=> navigate('/recetas')}>Ver recetas</button>
</div>
</div>


<div className="bg-white p-4 rounded shadow">
<h3 className="font-medium">Recetas médicas</h3>
{recipes.length === 0 ? <div className="text-sm text-gray-500 mt-2">No hay recetas para este paciente.</div> : (
<ul className="mt-3 space-y-2">
{recipes.map(r=> (
<li key={r.id || r._id} className="border rounded p-3 flex justify-between items-start">
<div>
<div className="text-sm font-medium">{r.diagnostico || r.summary || r.type}</div>
<div className="text-xs text-gray-600">{r.fecha_receta || r.date || ''} - ID: {r.id || r._id}</div>
</div>
<div className="flex gap-2">
<button className="px-3 py-1 rounded border" onClick={()=> navigate(`/recetas/${r.id || r._id}`)}>Ver</button>
</div>
</li>
))}
</ul>
)}
</div>


</div>
)
}