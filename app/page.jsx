'use client';
import { useState, useEffect } from 'react';
import DetailsModal from './components/DetailsModal';
import Sidebar from './components/Sidebar';
import Infobar from './components/Infobar';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import WarningModel from './components/WarningModel';
export default function Home() {

  const [searchInput, setSearchInput] = useState('');
  const [type, setType] = useState('');
  const [source, setSource] = useState('');
  const [results, setResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [openType, setOpenType] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const searchParams = useSearchParams();
  const [availableTypes, setAvailableTypes] = useState([]);
  

useEffect(() => {
  if (showWarning) {
    const timer = setTimeout(() => {
      setShowWarning(false);
    }, 2000);

    return () => clearTimeout(timer);
  }
}, [showWarning]);
  useEffect(() => {
    const query = searchParams.get("search");
    const typeParam = searchParams.get("type") || '';
    const sourceParam = searchParams.get("source") || '';

    if (query) {
      setSearchInput(query);
      setType(typeParam);
      setSource(sourceParam);
      search(1, query, typeParam, sourceParam);
    }
  }, []);

  const search = async (page = 1, keyword = searchInput, typeParam = type, sourceParam = source, append = false) => {
    if (!keyword.trim()) {
     setWarningMessage('Please enter the Search text...');
     setShowWarning(true);
     return;
    }

    setLoading(true);
    if (!append) {
      setCurrentPage(1);
      setResults([]);
      setHasMore(true);
    }

    try {
      fetch("/api/search-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          searched_text: keyword.trim(),
          type: type || null,
          source: source || null
        })
      }).catch(() => { });

      const res = await fetch(
        `/api/search?name=${encodeURIComponent(keyword)}&type=${encodeURIComponent(typeParam)}&source=${encodeURIComponent(sourceParam)}&page=${page}`
      );

      const data = await res.json();

      if (append) {
        setResults(prev => [...prev, ...(data.results || [])]);
      } else {
        setResults(data.results || []);
      }
      
      setTotalCount(data.totalCount || 0);
      setCurrentPage(page);
      setHasMore((data.results || []).length === 50);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      search(currentPage + 1, searchInput, type, source, true);
    }
  };

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 50;
    if (bottom && !loading && hasMore) {
      loadMore();
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
      
      if (!next) return;

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
      
      if (!prev) return;

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

      <Sidebar isDetailsOpen={isOpenDetails} />

      <main className="flex-1 flex flex-col">

        <Infobar />

        <div className="flex flex-1 overflow-hidden">

          {/* LEFT PANEL */}
          <div className={`${selectedRecord ? 'w-[60%]' : 'w-full'} p-6 bg-gray-100 flex flex-col transition-all duration-300 overflow-hidden`}>

            <h1 className="text-xl font-semibold mb-1">Global Sanctions Screening</h1>

            <p className="text-sm text-gray-500 mb-4">
              Scan global databases with multi-identifier fuzzy matching.
            </p>

            <div className="bg-white shadow rounded p-4 border border-gray-300">

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && search(1)}
                    className="w-full border rounded pl-10 pr-3 py-2 border-gray-300"
                    placeholder="Search by Name, Alias, IMO, Passport..."
                  />
                </div>

                <button
                  onClick={() => search(1)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Search
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-8 text-sm">


              


                <div className="flex items-center gap-3">
                  <span className="text-gray-500">Source :</span>

                  {['', 'EU', 'UK', 'US', 'UN'].map(s => (
                    <label key={s}>
                      <input
                        type="radio"
                        name="source"
                        value={s}
                        checked={source === s}
                        onChange={(e) => setSource(e.target.value)}
                        className="hidden peer"
                      />

                      <span className="px-3 py-1 bg-gray-50 border border-gray-400 text-gray-600 rounded-md cursor-pointer peer-checked:bg-black peer-checked:text-white">
                        {s || 'All'}
                      </span>
                    </label>
                  ))}
                </div>

              </div>
            </div>

            {!loading && results.length === 0 && !searchInput && (
              <div className="text-center mt-16 text-gray-500">
                <img src="/image/NoActive.png" className='h-50 w-70 p-2 mx-auto' />
                <h2 className="text-xl font-semibold">No Active Search</h2>
                <p className="text-sm">Enter name or alias to begin search.</p>
              </div>
            )}

            {(results.length > 0 || loading || searchInput) && (
              <div className="mt-6 bg-white rounded shadow flex flex-col flex-1 overflow-hidden">

                <div className="overflow-y-auto flex-1 border border-gray-300" onScroll={handleScroll}>
                  <table className="w-full text-sm border border-gray-100">

                    <thead className="bg-gray-50 sticky top-0 text-xs uppercase text-gray-600 z-[0] ">
                      <tr className="border-b border-gray-700  ">
                        <th className="p-3 text-left">ID</th>
                        <th className="p-3 text-left">Name / Aliases</th>
                        <th className="p-3 text-left">Type</th>
                        <th className="p-3 text-left">Source</th>
                        <th className="p-3 text-left">Key Identifiers</th>
                        <th className="p-3 text-left">Match %</th>
                      </tr>
                    </thead>

                    <tbody>
                      {results.length === 0 && !loading ? (
                        <tr>
                          <td colSpan="7" className="text-center p-8">
                            <img
                              src="/image/notFound.png"
                              alt="Not Found"
                              className="mx-auto h-[20%] w-[20%] mb-3"
                            />
                            <p className="font-semibold text-gray-500">
                              No matched record found
                            </p>
                          </td>
                        </tr>
                      ) : (
                        results.map((r, i) => (
                          <tr
                            key={`${r.tableName}-${r.ID}-${i}`}
                            className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                            onClick={() => {
                              setSelectedRecord({
                                table: r.tableName,
                                id: r.ID,
                                MATCH_PERCENT: r.MATCH_PERCENT
                              });
                              setSelectedIndex(i);
                              setIsOpenDetails(true);
                            }}
                          >
                            <td className="p-3 text-gray-600">{r.ID}</td>

                            <td className="p-3">
                              <div
                                className="font-semibold text-gray-800 max-w-[200px] truncate"
                                title={r.NAME}
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
                              <span className={`px-2 py-1 text-xs rounded ${typeBadge(r.TYPE)}`}>
                                {r.TYPE || 'N/A'}
                              </span>
                            </td>

                            <td className="p-3 text-gray-600">{r.SOURCE}</td>

                            <td
                              className="p-3 text-gray-600 max-w-[220px] truncate"
                              title={`${r.DOB || ''} ${r.NATIONALITY || ''}`}
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


                              </div>
                            </td>

                          </tr>
                        ))
                      )}
                      {loading && (
                        <tr>
                          <td colSpan="6" className="text-center p-4 text-gray-500">
                            Loading more...
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center px-4 py-3 bg-gray-50 text-sm border-t">
                  <span className="text-gray-600">
                    Showing {results.length} of {totalCount} Entries
                  </span>
                  {hasMore && (
                    <span className="text-gray-500 text-xs">
                      Scroll down to load more
                    </span>
                  )}
                </div>

              </div>
            )}

          </div>

          {/* RIGHT PANEL */}
          {selectedRecord && (
            <div className="w-1/2 border-l border-gray-400 bg-white overflow-y-auto">
              <DetailsModal
                table={selectedRecord.table}
                id={selectedRecord.id}
                match={selectedRecord.MATCH_PERCENT}
                onClose={() => {
                  setSelectedRecord(null);
                  setSelectedIndex(null);
                  setIsOpenDetails(false);
                }}
                onNext={goNext}
                onPrev={goPrev}
                hasNext={selectedIndex !== null && selectedIndex < results.length - 1}
                hasPrev={selectedIndex !== null && selectedIndex > 0}
              />
            </div>
          )}

        </div>
            {showWarning && (
              <WarningModel
                message={warningMessage}
                onClose={() => setShowWarning(false)}
              />
)}

      
      </main>
    </div>
  );
}