import { cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { afterEach } from 'vitest';
import Header from './Header';

afterEach(() => {
  cleanup();
});

describe('Header component', () => {
  it('should display current page', () => {
    render(<Header currentPage="test" />, { wrapper: BrowserRouter });
    expect(screen.getByText('Current: test')).toBeInTheDocument();
  });
});
