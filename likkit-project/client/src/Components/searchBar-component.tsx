import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { useHistory } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const fetchSuggestions = async (searchInput: string) => {
    try {
      const response = await axios.get(`/search`, { params: { term: searchInput } });
      setSuggestions(response.data || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const debouncedInputChange = debounce(fetchSuggestions, 300);
  const history = useHistory();

  useEffect(() => {
    if (input) {
      debouncedInputChange(input);
    } else {
      setSuggestions([]);
    }
  }, [input]);

  useEffect(() => {
    const topFiveResults = suggestions.slice(0, 5);
    setSearchResults(topFiveResults);
  }, [suggestions]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSuggestionClick = (suggestion: any) => {
    setInput('');
    history.push(`/posts/${suggestion.question_id}`);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <div>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Search..."
          style={{ width: '100%' }}
        />
      </div>
      {searchResults.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box',
            overflow: 'hidden',
            zIndex: 1000,
            backgroundColor: '#fff',
            borderRadius: '0 0 10px 10px',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.5)',
          }}
        >
          <h3
            style={{
              margin: 0,
              padding: '10px',
              backgroundColor: '#f7f7f7',
              borderBottom: '1px solid #ddd',
            }}
          >
            Search Results
          </h3>
          <ul
            style={{
              listStyleType: 'none',
              padding: 0,
              margin: 0,
              marginLeft: '5vw',
              marginRight: '5vw',
            }}
          >
            {searchResults.map((result, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(result)}
                style={{
                  padding: '10px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #ddd',
                  backgroundColor: '#fff', // default background color
                  transition: 'background-color 0.2s', // smooth transition for background color
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f7f7f7'; // light grey background on hover
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff'; // white background when not hovered
                }}
              >
                {result.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
