import React, { useState } from 'react';
import SearchBar from './searchBar-component';
import SearchResults from './searchResults-component';
import searchService from '../search-service';
import { QuestionSummary } from '../search-service';

const SearchContainer: React.FC = () => {
  const [searchResults] = useState<QuestionSummary[]>([]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
      }}
    >
      <SearchBar />
      <SearchResults results={searchResults} />
    </div>
  );
};

export default SearchContainer;
