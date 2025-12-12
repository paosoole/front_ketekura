// src/pages/RecipeDetail.jsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../api'
import Loader from '../components/ui/Loader'


export default function RecipeDetail(){
const { id } = useParams()
const [data, setData] = useState(null)
const [loading, setLoading] = useState(false)


useEffect(()=>{ load() }, [id])
async function load(){
try{ setLoading(true); const res = await api.getRecipeDetail(id); setData(res) }catch(e){ console.error(e); alert('Error cargando receta') } finally{ setLoading(false) }
}


if(loading || !data) return <Loader />


return (
<div className="space-y-4">
<div className="bg-white p-4 rounded shadow">
<h2 className="text-xl font-semibold">Receta: {data.id || data._id}</h2>
<div className="text-sm text-gray-600">Paciente: {data.paciente?.pnombre || data.pacRut} - Médico: {data.medico?.pnombre || data.medicoRut}</div>
<div className="mt-2">Diagnóstico: {data.diagnostico}</div>
</div>


<div className="bg-white p-4 rounded shadow">
<h3 className="font-medium">Medicamentos</h3>
<ul className="mt-3 space-y-2">
{data.medicamentos?.map((m, i) => (
<li key={i} className="border rounded p-3">
<div className="font-medium">{m.nombre}</div>
<div className="text-sm text-gray-600">Dosis: {m.dosis} • Frecuencia: {m.frecuencia} • Duración: {m.duracion}</div>
</li>
))}
</ul>
</div>
</div>
)
}