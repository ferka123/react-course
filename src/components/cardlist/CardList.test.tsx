import { cleanup, render } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import CardList from './CardList';
import { baseUrl } from '../../api/service';

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

describe('Card list component', () => {
  it('should fetch cards from api', async () => {
    const data = [
      {
        id: 1,
        title: 'Project Iceman Website',
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        date: '12.12.2000',
        rules: true,
        condition: 'new',
        category: 'car',
      },
      {
        id: 2,
        title: 'Kolapo Oladapo',
        image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
        date: '03.06.2020',
        rules: true,
        condition: 'old',
        category: 'home',
      },
    ];
    global.fetch = vi.fn().mockImplementation(() => Promise.resolve({ json: () => data }));

    const { findAllByRole } = render(<CardList query="test" />);
    const cardButtons = (await findAllByRole('button')) ?? [];

    expect(global.fetch).toBeCalledWith(`${baseUrl}?q=test`);
    expect(cardButtons.length).toBe(2);
  });

  it('should show error if fetch rejects', async () => {
    global.fetch = vi.fn().mockImplementation(() => Promise.reject());

    const { findByRole } = render(<CardList query="test" />);
    const error = await findByRole('alert');

    expect(error).toBeTruthy();
  });

  it('should show loader while fetching and No products after', async () => {
    global.fetch = vi.fn().mockImplementation(() => Promise.resolve({ json: () => [] }));

    const { container, findByText } = render(<CardList query="test" />);

    expect(container.querySelector('svg')).toBeTruthy();
    expect(await findByText('No products')).toBeTruthy();
  });
});
