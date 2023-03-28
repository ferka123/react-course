import Card from '../components/Card';
import { useEffect, useRef, useState } from 'react';
import { data } from '../fakedata/fakedata';
import './styles/home.scss';

export default function Home() {
  const searchValueRef = useRef<string>();
  const [searchValue, setSearchValue] = useState<string>(localStorage.getItem('searchValue') || '');
  searchValueRef.current = searchValue;

  useEffect(() => {
    return () => {
      localStorage.setItem('searchValue', searchValueRef.current || '');
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    searchValueRef.current = e.target.value;
  };
  return (
    <>
      <div className="search-form">
        <input type="text" value={searchValue} onChange={handleInputChange} />
        <button>Search</button>
      </div>
      <div className="cards">
        {data
          .filter((cardData) => cardData.name.toLowerCase().includes(searchValue))
          .map((cardData) => (
            <Card key={cardData.id} data={cardData} />
          ))}
      </div>
    </>
  );
}
