import { FakeCard } from '../fakedata/types';
import './styles/card.scss';

export default function Card({ data }: { data: FakeCard }) {
  const {
    name,
    address: { city },
    email,
    phone,
    company: { name: companyName },
  } = data;
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
