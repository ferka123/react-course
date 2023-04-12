import { cleanup } from '@testing-library/react';
import ExtendedCard from './ExtendedCard';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { renderWithStore } from '../../test/test-utils';
import { BASE_URL } from '../../redux/api';

enum QueryType {
  Successfull = 1,
  Empty = 2,
  Error = 3,
}

const server = setupServer(
  rest.get(`${BASE_URL}/catalog/:productid`, (req, res, ctx) => {
    const query = Number(req.params.productid);
    if (query === QueryType.Successfull)
      return res(
        ctx.status(200),
        ctx.json({
          id: 1,
          title: 'Project Iceman Website',
          image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
          date: '12.12.2000',
          rules: true,
          condition: 'new',
          category: 'car',
        })
      );
    else if (query === QueryType.Empty) return res(ctx.status(200), ctx.delay(100), ctx.json({}));
    else if (query === QueryType.Error) return res(ctx.status(404), ctx.json({ error: 'error' }));
  })
);

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());

describe('Extended card component', () => {
  it('should fetch card by id from api', async () => {
    const { findByText } = renderWithStore(<ExtendedCard id={QueryType.Successfull} />);

    expect(await findByText('Title: Project Iceman Website')).toBeInTheDocument();
    expect(await findByText('Category: car')).toBeInTheDocument();
    expect(await findByText('Date: 12.12.2000')).toBeInTheDocument();
    expect(await findByText('Condition: new')).toBeInTheDocument();
  });

  it('should show error if fetch rejects', async () => {
    const { findByText } = renderWithStore(<ExtendedCard id={QueryType.Error} />);

    expect(await findByText(/error/i)).toBeInTheDocument();
  });

  it('should show loader while fetching and No such product after', async () => {
    const { container, findByText } = renderWithStore(<ExtendedCard id={QueryType.Empty} />);

    expect(container.querySelector('svg')).toBeTruthy();
    expect(await findByText(/no such product/i)).toBeTruthy();
  });
});
