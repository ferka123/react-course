import { Product } from '../../api/types';
import classes from './card.module.scss';

const Card = ({ data }: { data: Product }) => (
  <div className={classes.card}>
    <p>Title: {data.title}</p>
    <p>Category: {data.category}</p>
    <p>Condition: {data.condition}</p>
    <p>Date: {data.date}</p>
    <img src={data.image} alt={data.title} className={classes.image} />
  </div>
);

export default Card;
