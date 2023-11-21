import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

interface SearchBarProps {
  onSearch: (query: string) => Promise<void>; 
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Array<any>>([]);
  const [searchResults, setSearchResults] = useState<Array<any>>([]);

  const fetchSuggestions = debounce(async (input: any) => {
    const response = await axios.get(`/search`, { params: { term: input } });
    setSuggestions(response.data || []);
  }, 300);

  useEffect(() => {
    if (input) fetchSuggestions(input);
  }, [input]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    fetchSuggestions(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(input); 
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <div>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Search..."
            style={{ width: '100%' }}
          />
          {suggestions.length > 0 && (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => setInput(suggestion.title)}>
                  <a href={`http://localhost:3000/#/posts/${suggestion.question_id}`}>
                    {suggestion.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
      <div>
        {searchResults.length > 0 && (
          <div>
            <h2>Search Results</h2>
            <ul>
              {searchResults.map((result, index) => (
                <li key={index}>{result.title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
