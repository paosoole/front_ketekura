// src/components/DataTable.jsx
import React from 'react'


export default function DataTable({ columns, data, onRowClick }) {
return (
<div className="overflow-x-auto bg-white rounded-lg shadow-sm">
<table className="min-w-full divide-y">
<thead className="bg-gray-100">
<tr>
{columns.map((col) => (
<th key={col.key} className="px-4 py-3 text-left text-sm font-medium text-gray-600">{col.title}</th>
))}
</tr>
</thead>
<tbody className="divide-y">
{data.map((row) => (
<tr key={row.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onRowClick && onRowClick(row)}>
{columns.map((col) => (
<td key={col.key} className="px-4 py-3 text-sm text-gray-700">{col.render ? col.render(row) : row[col.key]}</td>
))}
</tr>
))}
</tbody>
</table>
</div>
)
}