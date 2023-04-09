import Overlay from '../overlay/Overlay';
import { useState } from 'react';
import { Product } from '../../api/types';
import classes from './card.module.scss';
import ExtendedCard from './ExtendedCard';

const Card = ({ data }: { data: Product }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      {isModalOpen && (
        <Overlay setIsModalOpen={setIsModalOpen}>
          <ExtendedCard id={data.id} />
        </Overlay>
      )}
      <div className={classes.card}>
        <p>Title: {data.title}</p>
        <img src={data.image} alt={data.title} className={classes.image} />
        <button className={classes.btn} onClick={() => setIsModalOpen(true)}>
          Show more
        </button>
      </div>
    </>
  );
};

export default Card;
