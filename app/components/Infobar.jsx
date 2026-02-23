'use client';
import { useState, useEffect } from 'react';
import { AlertTriangle } from "lucide-react";   // 👈 icon
import SyncPanel from './SyncPanel';

const Infobar = () => {
  const [dbCount, setDbCount] = useState(0);
  const [showSync, setShowSync] = useState(false);

  useEffect(() => {
    fetch('/api/total-records')
      .then(r => r.json())
      .then(data => setDbCount(data.totalRecords || 0));
  }, []);

  return (
    <>
      <div className="h-14 bg-white border-b flex items-center justify-between px-6">

        <div className="flex items-center gap-3 text-sm">
          <span className="font-semibold text-gray-700">Search Module</span>
          <span className="text-green-500 text-xs">●</span>

          <span className="text-gray-500">
            Database Active:
            <span className='font-bold'>
              {dbCount >= 1000 ? (dbCount / 1000).toFixed(2) + 'K' : dbCount}
            </span> Records
          </span>
        </div>

        {/* SYNC BADGE */}
        <div
          onClick={() => setShowSync(true)}
          className="cursor-pointer flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-500 text-sm hover:bg-orange-100 transition"
        >
          <AlertTriangle size={16}/>
          Partial Sync • 1h 22m ago
        </div>

      </div>

      {showSync && <SyncPanel onClose={() => setShowSync(false)} />}
    </>
  );
};

export default Infobar;