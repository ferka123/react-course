import FormCard from '../components/form/FormCard';
import { useState } from 'react';
import Form from '../components/form/Form';
import { PersonCard } from '../components/form/types';
import './styles/forms.scss';

export default function Forms() {
  const [personCards, setPersonCards] = useState<PersonCard[]>([]);
  const setPerson = (person: PersonCard) => setPersonCards([...personCards, person]);
  return (
    <>
      <Form setPerson={setPerson} />
      {personCards.length > 0 && <h2 className="form-cards__title">Cards:</h2>}
      <div className="form-cards">
        {personCards.map((personCard, index) => (
          <FormCard key={index} personCard={personCard} />
        ))}
      </div>
    </>
  );
}
