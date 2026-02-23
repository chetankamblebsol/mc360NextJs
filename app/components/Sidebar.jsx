'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, History } from 'lucide-react';

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <aside
      className={`bg-white shadow flex flex-col transition-all duration-300 
      ${open ? 'w-64' : 'w-20'}`}
    >
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between p-4 border-b">

        {/* LEFT SIDE (LOGO + TEXT) */}
        <div className={`flex items-center gap-2 ${open ? '' : 'justify-center w-full'}`}>

          {/* LOGO ALWAYS VISIBLE */}
       <img
  src="/image/logo.png"
  className="h-7 w-auto object-contain shrink-0"
/>

          {/* TEXT ONLY WHEN OPEN */}
          {open && (
            <div>
              <p className="font-bold text-lg leading-none">MC360</p>
              <p className="text-xs pt-2 text-gray-400">Search Module</p>
            </div>
          )}
        </div>

        {/* TOGGLE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-500 hover:text-black transition"
        >
          {open ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>

      </div>

      {/* ================= NAVIGATION ================= */}
      <nav className="p-3 space-y-2 text-sm">

        <NavItem open={open} label="Search" Icon={Search} active />
        <NavItem open={open} label="History" Icon={History} />

      </nav>
    </aside>
  );
}

/* ========================= */
/* NAV ITEM COMPONENT */
/* ========================= */

function NavItem({ open, label, Icon, active }) {
  return (
    <a
      href="#"
      className={`flex items-center gap-3 px-3 py-2 rounded transition-all
        ${active
          ? 'bg-blue-500 text-white'
          : 'text-gray-600 hover:bg-gray-100'}`}
    >
      {/* ICON */}
      <Icon size={18} className="shrink-0" />

      {/* LABEL ONLY WHEN OPEN */}
      {open && (
        <span className="whitespace-nowrap">
          {label}
        </span>
      )}
    </a>
  );
}