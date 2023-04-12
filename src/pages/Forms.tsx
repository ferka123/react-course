import FormCard from '../components/form/FormCard';
import Form from '../components/form/Form';
import './styles/forms.scss';
import { useAppSelector } from '../redux/store';

export default function Forms() {
  const cards = useAppSelector((state) => state.formState.cards);
  return (
    <>
      <Form />
      {cards.length > 0 && <h2 className="form-cards__title">Cards:</h2>}
      <div className="form-cards">
        {cards.map((personCard, index) => (
          <FormCard key={index} personCard={personCard} />
        ))}
      </div>
    </>
  );
}
