// src/pages/Recipes.jsx
import React, { useEffect, useState } from 'react'
import DataTable from '../components/ui/DataTable'
import Loader from '../components/ui/Loader'
import { api } from '../api'
import { useNavigate } from 'react-router-dom'


export default function Recipes(){
const [recipes, setRecipes] = useState([])
const [loading, setLoading] = useState(false)
const navigate = useNavigate()


useEffect(()=>{ load() }, [])
async function load(){
try{ setLoading(true); const res = await api.listRecipes(); setRecipes(res.data || res || []) }catch(e){ console.error(e); alert('Error cargando recetas') } finally{ setLoading(false) }
}


const cols = [
{ key: 'id', title: 'ID', render: r => r.id || r._id },
{ key: 'fecha_receta', title: 'Fecha', render: r => r.fecha_receta || r.date },
{ key: 'pacRut', title: 'Paciente', render: r => r.pacRut || r.patientId },
{ key: 'diagnostico', title: 'Diagnóstico' }
]


return (
<section>
<div className="flex items-center justify-between mb-4">
<div>
<h1 className="text-2xl font-semibold">Recetas</h1>
<p className="text-sm text-gray-500">Recetas médicas guardadas en MongoDB</p>
</div>
</div>


{loading ? <Loader /> : <DataTable columns={cols} data={recipes} onRowClick={(r)=> navigate(`/recetas/${r.id || r._id}`)} />}
</section>
)
}