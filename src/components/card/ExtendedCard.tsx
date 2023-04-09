import { getProductById } from '../../api/service';
import { useEffect, useState } from 'react';
import { Product } from '../../api/types';
import classes from './card.module.scss';
import Spinner from '../loaders/Spinner';

const ExtendedCard = ({ id }: { id: number }) => {
  const [data, setData] = useState<Product>();
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        setData(await getProductById(id));
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) return <Spinner />;
  if (isError) return <div role={'alert'}>Error...</div>;
  if (!data || Object.keys(data).length === 0) return <div role={'alert'}>No such product...</div>;
  return (
    <div className={classes.card}>
      <span>Title: {data.title}</span>
      <span>Category: {data.category}</span>
      <span>Date: {data.date}</span>
      <span>Condition: {data.condition}</span>
      <img src={data.image} alt={data.title} className={classes.image} />
    </div>
  );
};

export default ExtendedCard;
