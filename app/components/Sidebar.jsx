'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, History } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  return (
    <aside
      className={`bg-white shadow flex flex-col transition-all duration-300 
      ${open ? 'w-64' : 'w-20'}`}
    >

      <div className="flex items-center justify-between p-4 border-b">

        <div className={`flex items-center gap-2 ${open ? '' : 'justify-center w-full'}`}>
          <img
            src="/image/logo.png"
            className="h-7 w-auto object-contain shrink-0"
          />

          {open && (
            <div>
              <p className="font-bold text-lg leading-none">MC360</p>
              <p className="text-xs pt-2 text-gray-400">Search Module</p>
            </div>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-gray-500 hover:text-black transition"
        >
          {open ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>

      </div>

      {/* ================= NAVIGATION ================= */}
    {/* ================= NAVIGATION ================= */}
<nav className="p-3 space-y-2 text-sm flex-1">

  <NavItem
    open={open}
    label="Search"
    Icon={Search}
    href="/"
    isActive={pathname === '/'}
  />

  <NavItem
    open={open}
    label="History"
    Icon={History}
    href="/history"
    isActive={pathname.includes('history')}
  />

</nav>

{/* ================== Footer ================== */}
{/* ================== User ================== */}
<div className='p-3 border-t flex items-center gap-6 justify-center'>
  <img 
    src='/image/user.png' 
    className='h-7 w-7 rounded-full'
  />

  {open && (
    <span className='text-sm text-gray-700 font-medium'>
      Chetan Kamble
    </span>
  )}
</div>

{/* ================== Footer ================== */}
<div className='p-4 border-t text-center text-xs text-gray-400'>
  © 2026 MC360. All rights reserved.
</div>
    </aside>
  );
}

/* ========================= */
/* NAV ITEM COMPONENT */
/* ========================= */

function NavItem({ open, label, Icon, isActive, href }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded transition-all
        ${isActive
          ? 'bg-blue-500 text-white'
          : 'text-gray-600 hover:bg-gray-100'}`}
    >
      <Icon size={18} className="shrink-0" />

      {open && (
        <span className="whitespace-nowrap">
          {label}
        </span>
      )}
    </Link>
  );
}