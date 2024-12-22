// src/components/SearchBox.tsx
import { Search } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { useEffect, useRef, useState } from 'react';
import { useSuggestions } from '../hooks/useSuggestions';

export function SearchBox() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [debouncedQuery, query, setQuery] = useDebounce(initialQuery, 300);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchBoxRef = useRef<HTMLDivElement>(null);
  
  const { suggestions, isLoading } = useSuggestions(debouncedQuery);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
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
          onFocus={() => setShowSuggestions(true)}
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

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg divide-y divide-gray-100">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => {
                setQuery(suggestion.result);  
                handleSearch(suggestion.result);
              }}
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-gray-400" />
                <span>{suggestion.result}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showSuggestions && isLoading && (
        <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg p-4">
          <div className="flex justify-center">
            <div className="animate-pulse flex space-x-4">
              <div className="h-4 w-28 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}