'use client';
import { useEffect, useState } from 'react';

export default function DetailsModal({ table, id, onClose }) {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/details?table=${table}&id=${id}`)
      .then(r => r.json())
      .then(data => {
        setPerson(data.record);
        setLoading(false);
      });
  }, [table, id]);

  // Detect long or JSON content automatically
  const renderValue = (value) => {
    if (!value) return "N/A";

    // JSON formatting
    if (typeof value === "string" && value.startsWith("{")) {
      try {
        const parsed = JSON.parse(value);
        return (
          <pre className="bg-gray-50 border rounded-md p-3 text-xs overflow-x-auto whitespace-pre-wrap">
            {JSON.stringify(parsed, null, 2)}
          </pre>
        );
      } catch {
        return value;
      }
    }

    // Long text handling
    if (typeof value === "string" && value.length > 200) {
      return (
        <div className="bg-gray-50 border rounded-md p-3 text-xs whitespace-pre-wrap">
          {value}
        </div>
      );
    }

    return value;
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-[1000px] max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
          <div>
            <h2 className="text-lg font-semibold">Record Details</h2>
            <p className="text-xs text-gray-500">Table: {table}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            ×
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 overflow-y-auto">
          {loading ? (
            <p className="text-center py-10">Loading...</p>
          ) : !person ? (
            <p className="text-center py-10">Record not found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              {Object.entries(person).map(([key, value]) => (
                <div key={key} className="border-b pb-3">
                  <div className="text-[11px] tracking-wide text-gray-400 uppercase mb-1">
                    {key}
                  </div>
                  <div className="text-sm text-gray-800 break-words">
                    {renderValue(value)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}