import { useState } from 'react';
import SearchBar from '../components/searchbar/SearchBar';
import './styles/home.scss';
import CardList from '../components/cardlist/CardList';

export default function Home() {
  const [query, setQuery] = useState<string>(localStorage.getItem('searchValue') || '');

  return (
    <>
      <SearchBar query={query} setQuery={setQuery} />
      <CardList query={query} />
    </>
  );
}
