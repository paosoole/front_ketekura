// src/pages/Payments.jsx
import React, { useEffect, useState } from 'react'
import DataTable from '../components/ui/DataTable'
import Loader from '../components/ui/Loader'
import { api } from '../api'


export default function Payments(){
const [data, setData] = useState([])
const [loading, setLoading] = useState(false)


useEffect(()=>{ load() }, [])
async function load(){
try{ setLoading(true); const res = await api.listPayments(); setData(res.data || res || []) }catch(e){ console.error(e); alert('Error cargando pagos') } finally{ setLoading(false) }
}


const cols = [
{ key: 'id', title: 'ID' },
{ key: 'date', title: 'Fecha' },
{ key: 'patient', title: 'Paciente' },
{ key: 'amount', title: 'Monto' },
{ key: 'status', title: 'Estado' }
]


return (
<section>
<div className="flex items-center justify-between mb-4">
<div>
<h1 className="text-2xl font-semibold">Pagos</h1>
<p className="text-sm text-gray-500">Pagos asociados a atenciones</p>
</div>
</div>


{loading ? <Loader /> : <DataTable columns={cols} data={data} />}
</section>
)
}