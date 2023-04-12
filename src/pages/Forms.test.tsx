import { cleanup } from '@testing-library/react';
import { renderWithStore } from '../test/test-utils';
import { afterEach } from 'vitest';
import Forms from './Forms';
import { PersonCard } from '../types/form';

afterEach(() => {
  cleanup();
});

describe('Forms page', () => {
  it('should show cards from redux store', async () => {
    const cards: PersonCard[] = [
      {
        name: 'Test1',
        lang: 'English',
        dob: '1985-12-12',
        image: 'test.png',
        gender: 'Male',
      },
      {
        name: 'Test2',
        lang: 'Russian',
        dob: '1985-12-12',
        image: 'test.png',
        gender: 'Female',
      },
    ];
    const { getByText } = renderWithStore(<Forms />, {
      preloadedState: { formState: { cards } },
    });

    expect(getByText(/Test1/i)).toBeDefined();
    expect(getByText(/Test2/i)).toBeDefined();
    expect(getByText(/Language: English/i)).toBeDefined();
    expect(getByText(/Language: Russian/i)).toBeDefined();
  });
});
