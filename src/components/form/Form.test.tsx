import { cleanup, render, fireEvent } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import Form from './Form';

afterEach(() => {
  cleanup();
  vi.resetAllMocks();
});

describe('Form component', () => {
  it('should set a valid person', () => {
    const setPersonMock = vi.fn();
    window.URL.createObjectURL = vi.fn((file: File) => file.name);
    window.alert = vi.fn();
    const { getByRole, getByTitle, getByLabelText } = render(<Form setPerson={setPersonMock} />);
    fireEvent.change(getByRole('textbox'), { target: { value: 'Test' } });
    fireEvent.click(getByLabelText(/Male/));
    fireEvent.click(getByRole('checkbox'));
    const file = new File(['contents'], 'test.png', { type: 'image/png' });
    fireEvent.change(getByTitle('Select a photo'), { target: { files: [file] } });
    fireEvent.change(getByTitle('Enter your DOB'), { target: { value: '1985-12-12' } });
    fireEvent.select(getByRole('combobox'), { target: { value: 'English' } });

    fireEvent.click(getByRole('button'));

    expect(window.alert).toHaveBeenCalledWith('Person Added');

    expect(setPersonMock).toHaveBeenCalledWith({
      name: 'Test',
      lang: 'English',
      dob: '1985-12-12',
      image: 'test.png',
      gender: 'Male',
    });
  });

  it('should show errors on ivalid input', () => {
    const setPersonMock = vi.fn();
    const { getAllByRole, getByRole } = render(<Form setPerson={setPersonMock} />);

    fireEvent.click(getByRole('button'));

    const errors = getAllByRole('alert');

    expect(errors.length).toBe(6);
  });
});
