import { cleanup } from '@testing-library/react';
import CardList from './CardList';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderWithStore } from '../../test/test-utils';
import { BASE_URL } from '../../redux/api';

enum QueryType {
  Successfull = 'Successfull',
  Empty = 'Empty',
  Error = 'Error',
}

const server = setupServer(
  rest.get(`${BASE_URL}/catalog`, (req, res, ctx) => {
    const query = req.url.searchParams.get('q');
    if (query === QueryType.Successfull)
      return res(
        ctx.status(200),
        ctx.json([
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
        ])
      );
    else if (query === QueryType.Empty) return res(ctx.status(200), ctx.delay(100), ctx.json([]));
    else if (query === QueryType.Error) return res(ctx.status(400), ctx.json({ error: 'error' }));
  })
);

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());

describe('Card list component', () => {
  it('should fetch cards from api', async () => {
    const { findAllByRole } = renderWithStore(<CardList />, {
      preloadedState: { searchState: { searchQuery: QueryType.Successfull } },
    });
    const cardButtons = (await findAllByRole('button')) ?? [];

    expect(cardButtons.length).toBe(2);
  });

  it('should show error if fetch rejects', async () => {
    const { findByRole } = renderWithStore(<CardList />, {
      preloadedState: { searchState: { searchQuery: QueryType.Error } },
    });
    const error = await findByRole('alert');

    expect(error).toBeTruthy();
  });

  it('should show loader while fetching and No products after', async () => {
    const { container, findByText } = renderWithStore(<CardList />, {
      preloadedState: { searchState: { searchQuery: QueryType.Empty } },
    });

    expect(container.querySelector('svg')).toBeTruthy();
    expect(await findByText('No products')).toBeTruthy();
  });
});
