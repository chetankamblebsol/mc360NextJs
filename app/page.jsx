'use client';
import { useState, useEffect } from 'react';
import DetailsModal from './components/DetailsModal';

export default function Home() {
  const [searchInput, setSearchInput] = useState('');
  const [type, setType] = useState('');
  const [source, setSource] = useState('');
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dbCount, setDbCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    fetch('/api/total-records')
      .then(r => r.json())
      .then(data => setDbCount(data.totalRecords || 0));
  }, []);

  const search = async (page = 1) => {
    if (!searchInput.trim()) {
      alert('Enter search text');
      return;
    }

    setLoading(true);
    setCurrentPage(page);

    try {
      const res = await fetch(`/api/search?name=${searchInput}&type=${type}&source=${source}&page=${page}`);
      const data = await res.json();
      
      setResults(data.results || []);
      setTotalCount(data.totalCount || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const typeBadge = (type) => {
    const map = {
      Individual: 'bg-blue-100 text-blue-600',
      Entity: 'bg-purple-100 text-purple-600',
      Organization: 'bg-purple-100 text-purple-600',
      Vessel: 'bg-green-100 text-green-600'
    };
    return map[type] || 'bg-gray-100 text-gray-600';
  };

  const matchBadge = (level) => {
    if (level === 'High') return 'bg-red-100 text-red-600';
    if (level === 'Medium') return 'bg-orange-100 text-orange-600';
    return 'bg-gray-100 text-gray-600';
  };

  const highlight = (text, keyword) => {
    if (!text) return '';
    const reg = new RegExp(`(${keyword})`, 'gi');
    return text.replace(reg, '<span class="bg-yellow-200 font-semibold px-1 rounded">$1</span>');
  };

  const totalPages = Math.ceil(totalCount / 50);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow flex flex-col">
        <div className="flex items-center gap-3 p-4 border-b">
          <div>
            <p className="font-bold text-lg leading-none">MC360</p>
            <p className="text-xs text-gray-400">Search Module</p>
          </div>
        </div>
        <nav className="p-3 space-y-2">
          <a href="/" className="block bg-blue-500 text-white px-3 py-2 rounded">Search</a>
          <a href="#" className="block text-gray-600 px-3 py-2 hover:bg-gray-100 rounded">History</a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="h-14 bg-white border-b flex items-center justify-between px-6">
          <div className="flex items-center gap-3 text-sm">
            <span className="font-semibold text-gray-700">Search Module</span>
            <span className="text-green-500 text-xs">●</span>
            <span className="text-gray-500">
              Database Active: {dbCount >= 100000 ? (dbCount / 100000).toFixed(2) + 'L' : dbCount} Records
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1 overflow-hidden">
          <h1 className="text-xl font-semibold mb-1">Entity Screening</h1>
          <p className="text-sm text-gray-500 mb-4">Scan global databases with multi-identifier fuzzy matching.</p>

          {/* Search Box */}
          <div className="bg-white shadow rounded p-4">
            <div className="flex gap-2">
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && search(1)}
                className="flex-1 border rounded px-3 py-2"
                placeholder="Search by Name, Alias, IMO, Passport..."
              />
              <button onClick={() => search(1)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Execute Search
              </button>
            </div>

            {/* Filters */}
            <div className="mt-4 flex flex-wrap items-center gap-8 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-gray-500">Type :</span>
                {['', 'Individual', 'Entity', 'Vessel'].map(t => (
                  <label key={t}>
                    <input type="radio" name="type" value={t} checked={type === t} onChange={(e) => setType(e.target.value)} className="hidden peer" />
                    <span className="px-3 py-1 bg-blue-50 border border-blue-400 text-blue-600 rounded-md cursor-pointer peer-checked:bg-blue-500 peer-checked:text-white">
                      {t || 'All'}
                    </span>
                  </label>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-gray-500">Source :</span>
                {['', 'EU', 'UK', 'US', 'UN'].map(s => (
                  <label key={s}>
                    <input type="radio" name="source" value={s} checked={source === s} onChange={(e) => setSource(e.target.value)} className="hidden peer" />
                    <span className="px-3 py-1 bg-blue-50 border border-blue-400 text-blue-600 rounded-md cursor-pointer peer-checked:bg-blue-500 peer-checked:text-white">
                      {s || 'All'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Empty State */}
          {!loading && results.length === 0 && !searchInput && (
            <div className="text-center mt-16 text-gray-500">
              <h2 className="text-xl font-semibold">No Active Search</h2>
              <p className="text-sm">Enter name or alias to begin search.</p>
            </div>
          )}

          {/* Results */}
          {(results.length > 0 || loading) && (
            <div className="mt-6 bg-white rounded shadow flex flex-col flex-1 overflow-hidden">
              <div className="overflow-y-auto flex-1">
                <table className="w-full text-sm border border-gray-200">
                  <thead className="bg-gray-50 sticky top-0 text-xs uppercase text-gray-600">
                    <tr className="border-b">
                      <th className="p-3 text-left">ID</th>
                      <th className="p-3 text-left">Name / Aliases</th>
                      <th className="p-3 text-left">Type</th>
                      <th className="p-3 text-left">Source</th>
                      <th className="p-3 text-left">Key Identifiers</th>
                      <th className="p-3 text-left">Match %</th>
                      <th className="p-3 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan="7" className="text-center p-6">Loading...</td></tr>
                    ) : results.length === 0 ? (
                      <tr><td colSpan="7" className="text-center p-6 font-semibold text-gray-500">No matched record found</td></tr>
                    ) : (
                      results.map((r, i) => (
                        <tr key={i} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="p-3 text-gray-600">{r.ID}</td>
                          <td className="p-3">
                            <div className="font-semibold text-gray-800" dangerouslySetInnerHTML={{ __html: highlight(r.NAME, searchInput) }} />
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-1 text-xs rounded ${typeBadge(r.TYPE)}`}>{r.TYPE}</span>
                          </td>
                          <td className="p-3 text-gray-600">{r.SOURCE}</td>
                          <td className="p-3 text-gray-600">{r.DOB || ''} {r.NATIONALITY || ''}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 text-xs font-semibold rounded ${matchBadge(r.MATCH_LEVEL)}`}>
                                {r.MATCH_PERCENT}%
                              </span>
                              <span className="text-xs text-gray-500">{r.MATCH_LEVEL}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <button onClick={() => setSelectedRecord({ table: r.tableName, id: r.ID })} className="text-blue-500 font-semibold hover:underline">View</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center px-4 py-3 border-t bg-gray-50 text-sm">
                <button onClick={() => search(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
                  Prev
                </button>
                <span className="text-gray-600">Page {currentPage} of {totalPages} ({totalCount} results)</span>
                <button onClick={() => search(currentPage + 1)} disabled={currentPage >= totalPages} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {selectedRecord && (
        <DetailsModal
          table={selectedRecord.table}
          id={selectedRecord.id}
          onClose={() => setSelectedRecord(null)}
        />
      )}

      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: system-ui, -apple-system, sans-serif; background: #f3f4f6; }
        .bg-blue-50 { background-color: #eff6ff; }
        .bg-blue-100 { background-color: #dbeafe; }
        .bg-blue-500 { background-color: #3b82f6; }
        .bg-blue-600 { background-color: #2563eb; }
        .bg-purple-100 { background-color: #f3e8ff; }
        .bg-green-100 { background-color: #dcfce7; }
        .bg-red-100 { background-color: #fee2e2; }
        .bg-orange-100 { background-color: #ffedd5; }
        .bg-yellow-200 { background-color: #fef08a; }
        .bg-gray-50 { background-color: #f9fafb; }
        .bg-gray-100 { background-color: #f3f4f6; }
        .bg-gray-200 { background-color: #e5e7eb; }
        .bg-white { background-color: white; }
        .text-blue-400 { color: #60a5fa; }
        .text-blue-500 { color: #3b82f6; }
        .text-blue-600 { color: #2563eb; }
        .text-purple-600 { color: #9333ea; }
        .text-green-500 { color: #22c55e; }
        .text-green-600 { color: #16a34a; }
        .text-red-600 { color: #dc2626; }
        .text-orange-600 { color: #ea580c; }
        .text-gray-400 { color: #9ca3af; }
        .text-gray-500 { color: #6b7280; }
        .text-gray-600 { color: #4b5563; }
        .text-gray-700 { color: #374151; }
        .text-gray-800 { color: #1f2937; }
        .text-white { color: white; }
        .border { border: 1px solid #e5e7eb; }
        .border-b { border-bottom: 1px solid #e5e7eb; }
        .border-t { border-top: 1px solid #e5e7eb; }
        .border-blue-400 { border-color: #60a5fa; }
        .border-gray-200 { border-color: #e5e7eb; }
        .rounded { border-radius: 0.375rem; }
        .rounded-md { border-radius: 0.375rem; }
        .rounded-full { border-radius: 9999px; }
        .shadow { box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1); }
        .flex { display: flex; }
        .hidden { display: none; }
        .block { display: block; }
        .items-center { align-items: center; }
        .justify-between { justify-content: space-between; }
        .gap-2 { gap: 0.5rem; }
        .gap-3 { gap: 0.75rem; }
        .gap-8 { gap: 2rem; }
        .flex-1 { flex: 1 1 0%; }
        .flex-col { flex-direction: column; }
        .flex-wrap { flex-wrap: wrap; }
        .p-1 { padding: 0.25rem; }
        .p-2 { padding: 0.5rem; }
        .p-3 { padding: 0.75rem; }
        .p-4 { padding: 1rem; }
        .p-6 { padding: 1.5rem; }
        .px-1 { padding-left: 0.25rem; padding-right: 0.25rem; }
        .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
        .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
        .px-4 { padding-left: 1rem; padding-right: 1rem; }
        .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
        .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
        .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
        .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
        .mb-1 { margin-bottom: 0.25rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mt-4 { margin-top: 1rem; }
        .mt-6 { margin-top: 1.5rem; }
        .mt-16 { margin-top: 4rem; }
        .w-64 { width: 16rem; }
        .w-full { width: 100%; }
        .h-14 { height: 3.5rem; }
        .h-screen { height: 100vh; }
        .text-xs { font-size: 0.75rem; line-height: 1rem; }
        .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
        .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
        .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
        .font-bold { font-weight: 700; }
        .font-semibold { font-weight: 600; }
        .uppercase { text-transform: uppercase; }
        .leading-none { line-height: 1; }
        .text-left { text-align: left; }
        .text-center { text-align: center; }
        .overflow-hidden { overflow: hidden; }
        .overflow-y-auto { overflow-y: auto; }
        .sticky { position: sticky; }
        .top-0 { top: 0; }
        .cursor-pointer { cursor: pointer; }
        .space-y-2 > * + * { margin-top: 0.5rem; }
        .hover\:bg-gray-100:hover { background-color: #f3f4f6; }
        .hover\:bg-gray-300:hover { background-color: #d1d5db; }
        .hover\:bg-gray-50:hover { background-color: #f9fafb; }
        .hover\:bg-blue-600:hover { background-color: #2563eb; }
        .hover\:underline:hover { text-decoration: underline; }
        .disabled\:opacity-50:disabled { opacity: 0.5; }
        input[type="radio"]:checked + span { background-color: #3b82f6; color: white; }
      `}</style>
    </div>
  );
}
