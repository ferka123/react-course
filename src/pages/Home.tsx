import Card from '../components/Card';
import { Component } from 'react';
import { data } from '../fakedata/fakedata';
import './styles/home.scss';

export default class Home extends Component<{ setCurrentPage: (name: string) => void }> {
  componentDidMount(): void {
    this.props.setCurrentPage('Home');
  }
  render() {
    return (
      <>
        <div className="search-form">
          <input type="text" />
          <button>Search</button>
        </div>
        <div className="cards">
          {data.map((cardData) => (
            <Card key={cardData.id} data={cardData} />
          ))}
        </div>
      </>
    );
  }
}
