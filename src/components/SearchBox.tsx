import { Search } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { useRef } from 'react';

export function SearchBox() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [, query, setQuery] = useDebounce(initialQuery, 300);
  const navigate = useNavigate();
  const searchBoxRef = useRef<HTMLDivElement>(null);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  return (
    <div className="relative" ref={searchBoxRef}>
      <div className="relative">
        <input
          type="text"
          value={query} 
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search recipes, ingredients, or cooking methods..."
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 bg-white"
        />
        <button
          onClick={() => handleSearch(query)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
        >
          <Search className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
}