import { cleanup, render, screen } from '@testing-library/react';
import { afterEach } from 'vitest';
import Card from './Card';
import { FakeCard } from 'fakedata/types';

const testCard: FakeCard = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
  },
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets',
  },
};

afterEach(() => {
  cleanup();
});

describe('Header component', () => {
  it('should display current page', () => {
    render(<Card data={testCard} />);
    expect(screen.getByText('Name: Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText('City: Gwenborough')).toBeInTheDocument();
    expect(screen.getByText('Email: Sincere@april.biz')).toBeInTheDocument();
    expect(screen.getByText('Phone: 1-770-736-8031 x56442')).toBeInTheDocument();
    expect(screen.getByText('Phone: 1-770-736-8031 x56442')).toBeInTheDocument();
  });
});
