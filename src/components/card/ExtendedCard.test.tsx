import { cleanup, render } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import ExtendedCard from './ExtendedCard';
import { baseUrl } from '../../api/service';

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

describe('Extended card component', () => {
  it('should fetch card by id from api', async () => {
    const data = {
      id: 1,
      title: 'Project Iceman Website',
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      date: '12.12.2000',
      rules: true,
      condition: 'new',
      category: 'car',
    };
    global.fetch = vi.fn().mockImplementation(() => Promise.resolve({ json: () => data }));

    const { findByText } = render(<ExtendedCard id={1} />);

    expect(global.fetch).toBeCalledWith(`${baseUrl}/1`);

    expect(await findByText('Title: Project Iceman Website')).toBeInTheDocument();
    expect(await findByText('Category: car')).toBeInTheDocument();
    expect(await findByText('Date: 12.12.2000')).toBeInTheDocument();
    expect(await findByText('Condition: new')).toBeInTheDocument();
  });

  it('should show error if fetch rejects', async () => {
    global.fetch = vi.fn().mockImplementation(() => Promise.reject());

    const { findByText } = render(<ExtendedCard id={1} />);

    expect(await findByText(/error/i)).toBeInTheDocument();
  });

  it('should show loader while fetching and No such product after', async () => {
    global.fetch = vi.fn().mockImplementation(() => Promise.resolve({ json: () => {} }));

    const { container, findByText } = render(<ExtendedCard id={1} />);

    expect(container.querySelector('svg')).toBeTruthy();
    expect(await findByText(/no such product/i)).toBeTruthy();
  });
});
