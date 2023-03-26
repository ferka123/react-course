import { Component } from 'react';
import { PersonCard } from './types';

export default class FormCard extends Component<{ personCard: PersonCard }> {
  render() {
    const { name, dob, image, gender, lang } = this.props.personCard;
    return (
      <div className="form-card">
        <p>Name: {name}</p>
        <img src={image} alt={name} />
        <p>Date of birth: {dob}</p>
        <p>Gender: {gender}</p>
        <p>Language: {lang}</p>
      </div>
    );
  }
}
