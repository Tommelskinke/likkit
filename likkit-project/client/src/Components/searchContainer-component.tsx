import React, { useState } from 'react';
import SearchBar from './searchBar-component'; // Your existing SearchBar component
import SearchResults from './searchResults-component'; // The new SearchResults component
import searchService from '../search-service'; // Adjust path as necessary
import { QuestionSummary } from '../search-service';

const SearchContainer: React.FC = () => {
  const [searchResults, setSearchResults] = useState<QuestionSummary[]>([]);

  const handleSearch = async (query: string) => {
    // Call your search service and update searchResults
    const results = await searchService.searchQuestions(query);
    setSearchResults(results);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={searchResults} />
    </div>
  );
};

export default SearchContainer;
