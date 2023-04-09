import { PersonCard } from './types';

export default function FormCard({ personCard }: { personCard: PersonCard }) {
  const { name, dob, image, gender, lang } = personCard;
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
