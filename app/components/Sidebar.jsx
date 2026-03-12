'use client';
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, History } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SyncPanel from './SyncPanel';

export default function Sidebar({ isDetailsOpen }) {
  const [open, setOpen] = useState(true);
  const [syncStatus, setSyncStatus] = useState("Successfully Synced");
  const [elapsed, setElapsed] = useState("just now");
  const [lastSync, setLastSync] = useState(new Date());
  const [showSync, setShowSync] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isDetailsOpen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isDetailsOpen]);

  const syncApi = async () => {
    try {
      const res = await fetch('/api/sync');
      const data = await res.json();
      setSyncStatus(data.status || "Successfully Synced");
      const now = new Date();
      setLastSync(now);
      setElapsed("just now");
    } catch (err) {
      setSyncStatus("Sync Failed");
    }
  };

  const updateElapsed = () => {
    const now = new Date();
    const diff = Math.floor((now - lastSync) / 1000);
    const hours = Math.floor(diff / 3600);
    const mins = Math.floor((diff % 3600) / 60);

    if (hours > 0) {
      setElapsed(`${hours}h ${mins}m ago`);
    } else if (mins > 0) {
      setElapsed(`${mins}m ago`);
    } else {
      setElapsed("just now");
    }
  };

  return (
    <>
      <aside
        className={`bg-white shadow flex flex-col transition-all duration-300 
        ${open ? 'w-64' : 'w-20'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-400">
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

        <div className="p-3 border-t border-gray-400">
          <div className="flex items-center gap-3">
            <div 
              onClick={() => setShowSync(true)}
              className="cursor-pointer flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-600 text-green-600 text-sm hover:bg-green-100 transition">
              <AlertTriangle size={16}/>
              {open && <span>{syncStatus} • {elapsed}</span>}
            </div>
            <button
              onClick={syncApi}
              className="p-2 rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-black transition"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        <div className='p-3 border-t border-gray-400 flex items-center gap-6 justify-center'>
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

        <div className='p-4 border-t border-gray-400 text-center text-xs text-gray-400'>
          © 2026 MC360. All rights reserved.
        </div>
      </aside>

      {showSync && <SyncPanel onClose={() => setShowSync(false)} />}
    </>
  );
}

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