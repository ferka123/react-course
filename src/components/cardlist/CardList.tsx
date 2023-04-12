import Card from '../card/Card';
import Spinner from '../loaders/Spinner';
import classes from './cardList.module.scss';
import { useAppSelector } from '../../redux/store';
import { useSearchProductQuery } from '../../redux/api';

const CardList = () => {
  const searchQuery = useAppSelector((state) => state.searchState.searchQuery);
  const { data, isError, isFetching } = useSearchProductQuery(searchQuery);

  if (isError) return <div role={'alert'}>Error</div>;
  if (isFetching) return <Spinner color="#fff" className={classes.loader} />;
  if (!data?.length) return <div>No products</div>;
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
