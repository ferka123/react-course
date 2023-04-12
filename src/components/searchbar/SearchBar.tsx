import { useState } from 'react';
import { setSearchQuery } from '../../redux/features/searchSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

const SearchBar = () => {
  const searchQuery = useAppSelector((state) => state.searchState.searchQuery);
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState<string>(searchQuery);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchQuery(inputValue));
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
