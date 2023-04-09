import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach } from 'vitest';
import Home from './Home';

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe('Home page', () => {
  it('search input should read from local storage', () => {
    localStorage.setItem('searchValue', 'testing');
    render(<Home />);

    expect(screen.getByDisplayValue('testing')).toBeInTheDocument();
  });

  it('search input should save on submit', async () => {
    const { getByRole } = render(<Home />);

    await userEvent.type(getByRole('textbox'), 'test');
    await userEvent.click(getByRole('button'));
    expect(localStorage.getItem('searchValue')).toBe('test');
  });
});
