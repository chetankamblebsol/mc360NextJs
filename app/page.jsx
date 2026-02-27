'use client';
import { useState, useEffect } from 'react';
import DetailsModal from './components/DetailsModal';
import Sidebar from './components/Sidebar';
import Infobar from './components/Infobar';
export default function Home() {
  const [searchInput, setSearchInput] = useState('');
  const [type, setType] = useState('');
  const [source, setSource] = useState('');
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);


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


 const goNext = () => {
  if (selectedIndex !== null && selectedIndex < results.length - 1) {
    const next = results[selectedIndex + 1];
    setSelectedIndex(prev => prev + 1);
    setSelectedRecord({
      table: next.tableName,
      id: next.ID,
      MATCH_PERCENT: next.MATCH_PERCENT
    });
  }
};

const goPrev = () => {
  if (selectedIndex !== null && selectedIndex > 0) {
    const prev = results[selectedIndex - 1];
    setSelectedIndex(prevIndex => prevIndex - 1);
    setSelectedRecord({
      table: prev.tableName,
      id: prev.ID,
      MATCH_PERCENT: prev.MATCH_PERCENT
    });
  }
};
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1 flex flex-col">
        {/* Top Navbar */}
       
        <Infobar/>
        {/* Content */}
        <div className="p-6 w-full flex flex-col bg-gray-100 flex-1 overflow-hidden">
          <h1 className="text-xl font-semibold mb-1">Global Sanctions Screening</h1>
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
                    <span className="px-3 py-1 bg-gray-50 border border-gray-400 text-gray-600 rounded-md cursor-pointer peer-checked:bg-black peer-checked:text-white">
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
                    <span className="px-3 py-1 bg-gray-50 border border-gray-400 text-gray-600 rounded-md cursor-pointer peer-checked:bg-black peer-checked:text-white">
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
              <img src="/image/NoActive.png" className='h-45 w-45 p-2 mx-auto'/>
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
                      {/* <th className="p-3 text-left">Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan="7" className="text-center p-6">Loading...</td></tr>
                    ) : results.length === 0 ? (
                      <tr><td colSpan="7" className="text-center p-6 font-semibold text-gray-500">No matched record found</td></tr>
                    ) : (
                      results.map((r, i) => (
                        <tr key={i} className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer" onClick={() => { setSelectedRecord({ table: r.tableName, id: r.ID, MATCH_PERCENT: r.MATCH_PERCENT }); setSelectedIndex(i); }}>
                          <td className="p-3 text-gray-600">{r.ID}</td>
                          <td className="p-3">
                            <div
                              className="font-semibold text-gray-800 max-w-[200px] truncate"
                              title={r.NAME}   // 👈 full name on hover
                              dangerouslySetInnerHTML={{
                                __html: highlight(
                                  r.NAME && r.NAME.length > 30
                                    ? r.NAME.slice(0, 30) + '...'
                                    : r.NAME,
                                  searchInput
                                )
                              }}
                            />
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-1 text-xs rounded ${typeBadge(r.TYPE)}`}>{r.TYPE}</span>
                          </td>
                          <td className="p-3 text-gray-600">{r.SOURCE}</td>
                          <td
                            className="p-3 text-gray-600 max-w-[220px] truncate"
                            title={`${r.DOB || ''} ${r.NATIONALITY || ''}`}  // 👈 full text on hover
                          >
                            {`${r.DOB || ''} ${r.NATIONALITY || ''}`.length > 20
                              ? `${(r.DOB || '')} ${(r.NATIONALITY || '')}`.slice(0, 20) + '...'
                              : `${r.DOB || ''} ${r.NATIONALITY || ''}`}
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 text-xs font-semibold rounded ${matchBadge(r.MATCH_LEVEL)}`}>
                                {r.MATCH_PERCENT}%
                              </span>
                              <span className="text-xs text-gray-500">{r.MATCH_LEVEL}</span>
                            </div>
                          </td>
                          {/* <td className="p-3">
                            <button onClick={(e) => { e.stopPropagation(); setSelectedRecord({ table: r.tableName, id: r.ID, MATCH_PERCENT: r.MATCH_PERCENT }); }} className="text-blue-500 font-semibold hover:underline">View</button>
                          </td> */}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center px-4 py-3 border-t bg-gray-50 text-sm">
                <div>
                  <span className="text-gray-600">Page {currentPage} of {totalPages} ({totalCount} results)</span>
                </div>
                <div className='flex gap-2 p-2'>
                  <button onClick={() => search(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
                    Prev
                  </button>

                  <button onClick={() => search(currentPage + 1)} disabled={currentPage >= totalPages} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {selectedRecord && (
        <DetailsModal
  table={selectedRecord.table}
  id={selectedRecord.id}
  match={selectedRecord.MATCH_PERCENT}
  onClose={() => {
    setSelectedRecord(null);
    setSelectedIndex(null);
  }}
  onNext={goNext}
  onPrev={goPrev}
  hasNext={selectedIndex !== null && selectedIndex < results.length - 1}
hasPrev={selectedIndex !== null && selectedIndex > 0}
/>
      )}
    </div>
  );
}
