import Card from '../components/Card';
import { Component } from 'react';
import { data } from '../fakedata/fakedata';
import './styles/home.scss';

interface Props {
  setCurrentPage: (name: string) => void;
}

interface State {
  searchValue: string;
}

export default class Home extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchValue: '',
    };
  }
  componentDidMount(): void {
    this.props.setCurrentPage('Home');
    this.setState({ searchValue: localStorage.getItem('searchValue') ?? '' });
  }
  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: e.target.value });
    localStorage.setItem('searchValue', e.target.value);
  };
  render() {
    return (
      <>
        <div className="search-form">
          <input type="text" value={this.state.searchValue} onChange={this.handleInputChange} />
          <button>Search</button>
        </div>
        <div className="cards">
          {data
            .filter((cardData) => cardData.name.toLowerCase().includes(this.state.searchValue))
            .map((cardData) => (
              <Card key={cardData.id} data={cardData} />
            ))}
        </div>
      </>
    );
  }
}
