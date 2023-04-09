import { useState } from 'react';

const SearchBar = ({ query, setQuery }: { query: string; setQuery: (v: string) => void }) => {
  const [inputValue, setInputValue] = useState<string>(query);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(inputValue);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
