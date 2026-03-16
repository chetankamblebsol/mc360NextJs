'use client';
import {
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Search,
  History,
  CheckCircle,
  ArrowUp,
  ArrowDown
} from "lucide-react";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar({ isDetailsOpen }) {
  const [open, setOpen] = useState(true);
  const [expandSync, setExpandSync] = useState(false);

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
      await fetch('/api/sync');
    } catch (error) {
      console.error('Sync failed', error);
    }
  };

  return (
    <aside
      className={`bg-white shadow flex flex-col transition-all duration-300 ${
        open ? 'w-64' : 'w-20'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <div className={`flex items-center gap-2 ${open ? '' : 'justify-center w-full'}`}>
          <img src="/image/logo.png" className="h-7 w-auto" alt="logo" />

          {open && (
            <div>
              <p className="font-bold text-lg">MC360</p>
              <p className="text-xs text-gray-400">Search Module</p>
            </div>
          )}
        </div>

        <button onClick={() => setOpen(!open)}>
          {open ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-2 flex-1">
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

      {/* Sync Card */}
      {open && (
        <div className="p-3">
          <div className="rounded-[24px] rounded-t-[8px] border border-gray-300 bg-white p-0 shadow-sm">

            {/* Sync Header */}
     

<div className="flex items-center gap-3 text-gray-600 text-sm p-3 font-medium">
  <div className="bg-green-100 border border-green-300 rounded-full p-2">
    <CheckCircle size={16} className="text-green-500" />
  </div>

  <div className="flex-1">
    <span className="block text-gray-700">
      Last Successful Sync
    </span>

    <p className="text-black font-semibold border-b border-gray-300 pb-2 mt-1 text-xs">
      Mar 16, 2026 10:00 AM
    </p>
  </div>
</div>





    

            {/* Expand Table */}
            {expandSync && (
              <div className="mt-3 px-3">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-gray-500">
                      <th className="text-left pb-2">SOURCE</th>
                      <th className="text-right pb-2">STATUS</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-2 text-blue-500 font-medium text-underline"><a href="https://sanctionssearch.ofac.treas.gov/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-700">US</a></td>
                      <td className="py-2 text-right">
                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded-md">
                          12:00 UTC
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td className="py-2 text-blue-500 font-medium"><a href="https://www.sanctionsmap.eu/#/main" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-700">EU</a></td>
                      <td className="py-2 text-right">
                        <span className="bg-red-100 text-red-500 px-2 py-1 rounded-md">
                          12:05 UTC
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td className="py-2 text-blue-500 font-medium"><a href="https://sanctionssearchapp.ofsi.hmtreasury.gov.uk/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-700">UK</a></td>
                      <td className="py-2 text-right">
                        <span className="bg-red-100 text-red-500 px-2 py-1 rounded-md">
                          12:11 UTC
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td className="py-2 text-blue-500 font-medium"><a href="https://main.un.org/securitycouncil/en/content/un-sc-consolidated-list" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-700">UN</a></td>
                      <td className="py-2 text-right">
                        <span className="bg-green-100 text-green-600 px-2 py-1 rounded-md">
                          12:03 UTC
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* View Toggle */}
     
<button
  onClick={() => setExpandSync(!expandSync)}
  className="text-xs text-gray-500  w-full flex items-center justify-center gap-1 hover:text-black transition"
>
  {expandSync ? (
    <>
      <span>View Less</span>
      <ArrowUp size={14} />
    </>
  ) : (
    <>
      <span>View More</span>
      <ArrowDown size={14} />
    </>
  )}
</button>


            {/* Partial Sync */}
            <div className="mt-3 bg-orange-100 px-3 py-2 rounded-full border border-orange-400 flex items-center justify-between">
              <p className="text-orange-600 text-sm font-medium">
                Partial Sync
              </p>

              <RefreshCw
                size={16}
                className="text-orange-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* User */}
      <div className="p-3 border-t border-gray-300 flex items-center gap-3 justify-center">
        <img
          src="/image/user.png"
          className="h-7 w-7 rounded-full"
          alt="user"
        />

        {open && (
          <span className="text-sm text-gray-700 font-medium">
            Chetan Kamble
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-300 text-center text-xs text-gray-400">
        © 2026 MC360. All rights reserved.
      </div>
    </aside>
  );
}

function NavItem({ open, label, Icon, isActive, href }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded ${
        isActive
          ? 'bg-blue-500 text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon size={18} />

      {open && <span>{label}</span>}
    </Link>
  );
}
