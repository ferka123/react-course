import { cleanup, render, screen, fireEvent } from '@testing-library/react';
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

  it('search input should save on unmount', async () => {
    const { unmount } = render(<Home />);

    const input = screen.getByDisplayValue('') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'unmount' } });
    expect(input.value).toBe('unmount');

    expect(localStorage.getItem('searchValue')).toBeNull();
    unmount();
    expect(localStorage.getItem('searchValue')).toBe('unmount');
  });
});
