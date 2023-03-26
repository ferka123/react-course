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
    render(<Home setCurrentPage={() => {}} />);

    expect(screen.getByDisplayValue('testing')).toBeInTheDocument();
  });

  it('search input should read from local storage', async () => {
    render(<Home setCurrentPage={() => {}} />);

    const input = screen.getByDisplayValue('') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });

    expect(input.value).toBe('test');
    expect(localStorage.getItem('searchValue')).toBe('test');
  });
});
