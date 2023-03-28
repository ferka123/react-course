import FormCard from '../components/form/FormCard';
import { Component } from 'react';
import Form from '../components/form/Form';
import { PersonCard } from '../components/form/types';
import './styles/forms.scss';

interface State {
  personCards: PersonCard[];
}

export default class Forms extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      personCards: [],
    };
  }
  setPerson = (person: PersonCard) =>
    this.setState({ personCards: [...this.state.personCards, person] });
  render() {
    return (
      <>
        <Form setPerson={this.setPerson} />
        {this.state.personCards.length > 0 && <h2 className="form-cards__title">Cards:</h2>}
        <div className="form-cards">
          {this.state.personCards.map((personCard, index) => (
            <FormCard key={index} personCard={personCard} />
          ))}
        </div>
      </>
    );
  }
}
