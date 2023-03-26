import FormCard from '../components/form/FormCard';
import { Component } from 'react';
import Form from '../components/form/Form';
import { PersonCard } from '../components/form/types';
import './styles/forms.scss';

interface Props {
  setCurrentPage: (name: string) => void;
}

interface State {
  personCards: PersonCard[];
}

export default class Forms extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      personCards: [],
    };
  }
  componentDidMount(): void {
    this.props.setCurrentPage('Forms');
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
