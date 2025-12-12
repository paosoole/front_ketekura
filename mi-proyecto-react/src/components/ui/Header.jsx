// src/components/ui/Header.jsx
import React from 'react'


export default function Header(){
return (
<header className="bg-white shadow-sm">
<div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-lg bg-gradient-to-br from-ketekuraBlue to-ketekuraAccent flex items-center justify-center text-white font-bold text-xl">K</div>
<div>
<div className="font-semibold">Ketekura</div>
<div className="text-xs text-gray-500">Gestión clínica</div>
</div>
</div>
<div className="flex items-center gap-4">
<div className="text-sm text-gray-600">Usuario: Admin</div>
</div>
</div>
</header>
)
}