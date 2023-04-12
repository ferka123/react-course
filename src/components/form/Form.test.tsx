import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithStore } from '../../test/test-utils';
import { afterEach, vi } from 'vitest';
import Form from './Form';

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

describe('Form component', () => {
  it('should set a valid person', async () => {
    window.URL.createObjectURL = vi.fn((file: File) => file.name);
    window.alert = vi.fn();
    const { getByRole, getByTitle, getByLabelText, store } = renderWithStore(<Form />);

    await userEvent.type(getByRole('textbox'), 'Test');
    await userEvent.click(getByLabelText(/Male/));
    await userEvent.click(getByRole('checkbox'));
    const file = new File(['contents'], 'test.png', { type: 'image/png' });
    await userEvent.upload(getByTitle('Select a photo'), file);
    await userEvent.type(getByTitle('Enter your DOB'), '1985-12-12');
    await userEvent.selectOptions(getByRole('combobox'), 'English');

    await userEvent.click(getByRole('button'));

    expect(store.getState().formState.cards).toEqual([
      {
        name: 'Test',
        lang: 'English',
        dob: '1985-12-12',
        image: 'test.png',
        gender: 'Male',
      },
    ]);
  });

  it('should show errors on ivalid input', async () => {
    const { getAllByRole, getByRole } = renderWithStore(<Form />);

    await userEvent.click(getByRole('button'));

    const errors = getAllByRole('alert');

    expect(errors.length).toBe(6);
  });
});
