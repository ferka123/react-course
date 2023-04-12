import { getProducts } from '../../api/service';
import Card from '../card/Card';
import { useEffect, useState } from 'react';
import { Product } from '../../api/types';
import Spinner from '../loaders/Spinner';
import classes from './cardList.module.scss';
import { useAppSelector } from '../../redux/store';

const CardList = () => {
  const searchQuery = useAppSelector((state) => state.searchState.searchQuery);
  const [data, setData] = useState<Product[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        setData(await getProducts(searchQuery));
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  if (isError) return <div role={'alert'}>Error</div>;
  if (isLoading) return <Spinner color="#fff" className={classes.loader} />;
  if (!data.length) return <div>No products</div>;
  return (
    <>
      <div className={classes.cards}>
        {data.map((card) => (
          <Card key={card.id} data={card} />
        ))}
      </div>
    </>
  );
};

export default CardList;
