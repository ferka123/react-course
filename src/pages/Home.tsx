import SearchBar from '../components/searchbar/SearchBar';
import './styles/home.scss';
import CardList from '../components/cardlist/CardList';

export default function Home() {
  return (
    <>
      <SearchBar />
      <CardList />
    </>
  );
}
