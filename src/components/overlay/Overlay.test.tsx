import { cleanup, render } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Overlay from './Overlay';
import classes from './overlay.module.scss';

afterEach(() => {
  cleanup();
});

describe('Overlay component', () => {
  it('should close on close button', async () => {
    const closeMock = vi.fn();
    const { getByRole } = render(<Overlay setIsModalOpen={closeMock} />);

    await userEvent.click(getByRole('button'));

    expect(closeMock).toBeCalledWith(false);
  });

  it('should close on outside', async () => {
    const closeMock = vi.fn();
    const { container } = render(<Overlay setIsModalOpen={closeMock} />);

    await userEvent.click(container.querySelector(`.${classes.overlay}`)!);

    expect(closeMock).toBeCalledWith(false);
  });

  it('should not close on inside', async () => {
    const closeMock = vi.fn();
    const { container } = render(<Overlay setIsModalOpen={closeMock} />);

    await userEvent.click(container.querySelector(`.${classes.content}`)!);

    expect(closeMock).not.toHaveBeenCalled();
  });
});
