import React, { useState, ChangeEvent, FormEvent } from 'react';
import searchService from '../search-service';

function SearchBar(): JSX.Element {
  const [search, setSearch] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(search);
    searchService.searchQuestions(search);
    setSearch('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={search} onChange={handleInputChange} placeholder="Search..." />
    </form>
  );
}

export default SearchBar;
