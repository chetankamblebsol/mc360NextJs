'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import Infobar from '../components/Infobar';

export default function Page() {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/search-history');
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteHistory = async (id) => {
    await fetch(`/api/search-history?id=${id}`, {
      method: 'DELETE'
    });
    fetchHistory();
  };

  const clearAll = async () => {
    if (!confirm("Are you sure you want to clear all history?")) return;

    await fetch(`/api/search-history?id=all`, {
      method: 'DELETE'
    });

    fetchHistory();
  };

  const redirectToSearch = (text, type, source) => {

    const query = new URLSearchParams({
      search: text,
      source: source || ''
    });

    router.push(`/?${query.toString()}`);
  };

  // 📊 Analytics
  const totalSearches = history.length;
  const uniqueUsers = new Set(history.map(h => h.username)).size;
  const todayCount = history.filter(h => {
    const today = new Date().toDateString();
    return new Date(h.searched_at).toDateString() === today;
  }).length;

  // ⭐ show only last 5 if showAll = false
  const displayHistory = showAll ? history : history.slice(0, 5);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        <Infobar />

        <div className="p-6 bg-gray-100 flex-1 overflow-hidden">

          {/* Page Title + Clear Button */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold">Search History</h1>

            <button
              onClick={clearAll}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              Clear All
            </button>
          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded shadow">
              <p className="text-gray-500 text-sm">Total Searches</p>
              <p className="text-2xl font-semibold">{totalSearches}</p>
            </div>

       
            <div className="bg-white p-4 rounded shadow">
              <p className="text-gray-500 text-sm">Today Searches</p>
              <p className="text-2xl font-semibold">{todayCount}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 py-5">
            Showing your 5 most recent searches. Click any search text to view the results.
          </p>
          {/* Table */}
          {/* Table */}
          <div className="bg-white rounded shadow flex flex-col overflow-hidden">

            <div className="overflow-y-auto max-h-[400px]">

              <table className="w-full text-sm border border-gray-200 table-fixed">

                <thead className="bg-gray-50 sticky top-0 text-xs uppercase text-gray-600">
                  <tr className="border-b">
                    <th className="px-6 py-3 text-left w-1/2">
                      Search Text
                    </th>
                  
                    <th className="px-6 py-3 text-left w-1/2">
                      Source
                    </th>
                   
                    <th className="px-6 py-3 text-left w-1/4">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="3" className="text-center py-8">
                        Loading...
                      </td>
                    </tr>
                  ) : history.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center py-8 text-gray-500 font-semibold">
                        No Search History Found
                      </td>
                    </tr>
                  ) : (
                    displayHistory.map((item) => (
                      <tr
                        key={item.id}
                        className=" hover:bg-gray-50 transition"
                      >
                        <td
                          onClick={() =>
                            redirectToSearch(
                              item.searched_text,
                              item.type,
                              item.source
                            )
                          }
                          className="px-6 py-4 font-semibold text-blue-600 cursor-pointer hover:underline truncate"
                        >
                          {item.searched_text}
                        </td>

                      
                        <td className="px-6 py-4 text-gray-700">
                          {item.source || 'All'}
                        </td>
                       

                        <td className="px-6 py-4">
                          <button
                            onClick={() => deleteHistory(item.id)}
                            className="text-red-500 font-semibold hover:underline"
                          >
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
  <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
</svg>

                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>

              </table>

              {/* ⭐ Show All Button */}
              {!showAll && history.length > 5 && (
                <div className="text-center p-4">
                  <button
                    onClick={() => setShowAll(true)}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Show All
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}