import { Component } from 'react';
import Form from '../components/form/Form';
import './styles/forms.scss';

interface Props {
  setCurrentPage: (name: string) => void;
}

type State = Record<string, never>;

export default class Forms extends Component<Props, State> {
  componentDidMount(): void {
    this.props.setCurrentPage('Forms');
  }
  render() {
    return <Form />;
  }
}
