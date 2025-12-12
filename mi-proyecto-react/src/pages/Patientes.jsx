// src/pages/Patients.jsx
import { useNavigate } from 'react-router-dom'
import DataTable from '../components/DataTable'
import { api } from '../api'


export default function Patients() {
const [patients, setPatients] = useState([])
const [loading, setLoading] = useState(false)
const [q, setQ] = useState('')
const navigate = useNavigate()


useEffect(() => {
load()
}, [])


async function load() {
try {
setLoading(true)
const res = await api.listPatients({ q, page: 1, limit: 50 })
setPatients(res.data || [])
} catch (err) {
console.error(err)
alert('Error cargando pacientes: ' + err.message)
} finally { setLoading(false) }
}


const columns = [
{ key: 'id', title: 'ID' },
{ key: 'name', title: 'Nombre' , render: r => r.fullName || r.name },
{ key: 'document', title: 'Documento' },
{ key: 'phone', title: 'Teléfono' }
]


return (
<section>
<div className="flex items-center justify-between mb-4">
<div>
<h1 className="text-2xl font-semibold">Pacientes</h1>
<p className="text-sm text-gray-500">Consulta y administra los pacientes.</p>
</div>
<div className="flex gap-2">
<input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar paciente..." className="border rounded px-3 py-2" />
<button onClick={load} className="bg-indigo-600 text-white px-4 py-2 rounded">Buscar</button>
</div>
</div>


{loading ? <div className="p-6 bg-white rounded shadow text-center">Cargando...</div> : (
<DataTable columns={columns} data={patients} onRowClick={(row)=> navigate(`/patients/${row.id}`)} />
)}
</section>
)
}