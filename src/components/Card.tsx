import { FakeCard } from '../fakedata/types';
import { Component } from 'react';
import './styles/card.scss';

export default class Card extends Component<{ data: FakeCard }> {
  render() {
    const {
      name,
      address: { city },
      email,
      phone,
      company: { name: companyName },
    } = this.props.data;
    return (
      <div className="cards__card">
        <p>Name: {name}</p>
        <p>City: {city}</p>
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
        <p>Company: {companyName}</p>
      </div>
    );
  }
}
