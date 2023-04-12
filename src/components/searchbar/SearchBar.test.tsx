import { cleanup } from '@testing-library/react';
import { renderWithStore } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { afterEach } from 'vitest';
import SearchBar from './SearchBar';

afterEach(() => {
  cleanup();
});

describe('Searchbar component', () => {
  it('should get value from redux store', () => {
    const { getByRole } = renderWithStore(<SearchBar />, {
      preloadedState: { searchState: { searchQuery: 'hello' } },
    });
    const input = getByRole('textbox') as HTMLInputElement;

    expect(input.value).toEqual('hello');
  });

  it('should save value to redux store on submit', async () => {
    const { getByRole, store } = renderWithStore(<SearchBar />);

    await userEvent.type(getByRole('textbox'), 'testing');
    await userEvent.click(getByRole('button'));

    expect(store.getState().searchState.searchQuery).toEqual('testing');
  });
});
