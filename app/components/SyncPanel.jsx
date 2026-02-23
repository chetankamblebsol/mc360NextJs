'use client';

import { RefreshCw, CheckCircle, AlertCircle, X } from "lucide-react";

export default function SyncPanel({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">

      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* PANEL */}
      <div className="relative w-[380px] h-full bg-white shadow-xl p-5 overflow-y-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Database Sync Status</h2>
          <X size={18} className="cursor-pointer" onClick={onClose}/>
        </div>

        {/* GLOBAL STATUS */}
        <div className="border rounded-lg p-4 space-y-3 text-sm bg-gray-50">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500"/>
            Last Successful Sync<br/>
          </div>
          <b>Feb 18, 2026, 11:30 AM</b>

          <div>Next Scheduled Sync <b>14:00 UTC</b></div>
          <div>Sync Frequency <b>Every 2 hours</b></div>

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-600 rounded">
            <AlertCircle size={14}/>
            Partially Synced
          </div>
        </div>

        {/* PER SOURCE */}
        <div className="mt-6 space-y-3 text-sm">
          <Row name="US" time="12:00 UTC" ok />
          <Row name="EU" time="12:05 UTC" />
          <Row name="UK" time="12:11 UTC" />
          <Row name="UN" time="12:03 UTC" ok />
        </div>

        {/* BUTTON */}
        <button className="mt-8 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
          <RefreshCw size={16}/>
          Sync Now
        </button>

      </div>
    </div>
  );
}

function Row({ name, time, ok }) {
  return (
    <div className="flex justify-between items-center border-b pb-2">
      <span>{name}</span>
      <span className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
        ok ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
      }`}>
        {ok ? <CheckCircle size={12}/> : <AlertCircle size={12}/>}
        {time}
      </span>
    </div>
  );
}