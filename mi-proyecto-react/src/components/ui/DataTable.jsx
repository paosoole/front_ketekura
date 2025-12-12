// src/components/ui/DataTable.jsx
import React from 'react'


export default function DataTable({columns, data, onRowClick}){
return (
<div className="overflow-x-auto bg-white rounded-lg shadow-sm">
<table className="min-w-full divide-y">
<thead className="bg-gray-50">
<tr>
{columns.map(c=> <th key={c.key} className="px-4 py-3 text-left text-sm font-medium text-gray-600">{c.title}</th>)}
</tr>
</thead>
<tbody className="divide-y">
{data.map(row => (
<tr key={row.id || row._id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onRowClick && onRowClick(row)}>
{columns.map(c=> <td key={c.key} className="px-4 py-3 text-sm text-gray-700">{c.render ? c.render(row) : row[c.key]}</td>)}
</tr>
))}
</tbody>
</table>
</div>
)
}