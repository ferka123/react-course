import classes from './card.module.scss';
import Spinner from '../loaders/Spinner';
import { useGetProductByIdQuery } from '../../redux/api';

const ExtendedCard = ({ id }: { id: number }) => {
  const { data, isFetching, isError } = useGetProductByIdQuery(id);

  if (isFetching) return <Spinner />;
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
