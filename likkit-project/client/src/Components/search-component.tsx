import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import searchService from '../search-service';

function SearchBar(): JSX.Element {
  const [input, setInput] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Array<any>>([]);
  const [searchResults, setSearchResults] = useState<Array<any>>([]); // State to hold search results

  const fetchSuggestions = debounce(async (query) => {
    const response = await axios.get(`http://localhost:3000/api/suggest?term=${query}`);
    setSuggestions(response.data || []);
  }, 300);

  useEffect(() => {
    if (input) fetchSuggestions(input);
  }, [input]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    fetchSuggestions(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const results = await searchService.searchQuestions(input);
      setSearchResults(results); // Update the state with the search results
      setInput(''); // Reset the input field after search
      setSuggestions([]); // Clear suggestions after search
    } catch (error) {
      console.error('Error fetching search results:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" value={input} onChange={handleInputChange} placeholder="Search..." />
          {suggestions.length > 0 && (
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => setInput(suggestion.title)}>
                  {suggestion.title}
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
                // Display the search results here
                // Adjust the rendering based on your result object structure
                <li key={index}>{result.title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
