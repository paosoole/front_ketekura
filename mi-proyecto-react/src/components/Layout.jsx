// src/components/Layout.jsx
import React from 'react'
import Header from './ui/Header.jsx'
import Sidebar from './ui/Sidebar.jsx'


export default function Layout({ children }){
return (
<div className="min-h-screen flex bg-[#f7fbff]">
<Sidebar />
<div className="flex-1">
<Header />
<main className="p-6 container-max">{children}</main>
</div>
</div>
)
}