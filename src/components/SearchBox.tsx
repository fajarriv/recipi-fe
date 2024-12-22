import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Suggestion {
  id: string;
  title: string;
}

export function SearchBox() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 2) {
      // Replace this with actual API call
      const mockSuggestions = [
        { id: '1', title: query + ' soup' },
        { id: '2', title: query + ' salad' },
        { id: '3', title: query + ' pasta' },
      ];
      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
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
          placeholder="Search for food recipes..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
        />
        <button
          onClick={() => handleSearch(query)}
          className="absolute right-2 top-1/2 -translate-y-1/2"
        >
          <Search className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setQuery(suggestion.title);
                handleSearch(suggestion.title);
                setShowSuggestions(false);
              }}
            >
              {suggestion.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}