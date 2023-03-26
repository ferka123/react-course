import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { afterEach } from 'vitest';
import App from './App';

afterEach(() => {
  cleanup();
});

describe('App component', () => {
  it('should display current page', async () => {
    render(<App />, { wrapper: BrowserRouter });

    fireEvent.click(screen.getByText('About Us'));

    expect(screen.getByText('Current: About Us')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Home'));

    expect(screen.getByText('Current: Home')).toBeInTheDocument();
  });
});
