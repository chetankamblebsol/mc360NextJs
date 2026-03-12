'use client';
import { useState, useEffect } from 'react';

const Infobar = () => {
  const [dbCount, setDbCount] = useState(0);
  const [dbActive, setDbActive] = useState(false);

  useEffect(() => {
    fetch('/api/total-records')
      .then(r => r.json())
      .then(data => {
        setDbCount(data.totalRecords || 0);
        setDbActive(true);
      })
      .catch(() => setDbActive(false));
  }, []);

  return (
    <div className="h-14 bg-white flex items-center justify-between px-6">
      <div className="flex items-center gap-3 text-sm">
        <span className="font-semibold text-gray-700">Search Module</span>
        {dbActive ? (
          <span className="text-green-500 text-xs">●</span>
        ) : (
          <span className="text-red-500 text-xs">●</span>
        )}
        {dbActive ? (
          <span className="text-gray-500">
            Database Active : 
            <span className='font-bold text-gray-700 ml-2 mr-1'>
              {dbCount >= 1000 ? (dbCount / 1000).toFixed(2) + 'K' : dbCount}
            </span> Records
          </span>
        ) : (
          <span className="text-red-500">
            Database Connection Failed
          </span>
        )}
      </div>
    </div>
  );
};

export default Infobar;