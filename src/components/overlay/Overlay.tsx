import { PropsWithChildren } from 'react';
import classes from './overlay.module.scss';

const Overlay = ({
  children,
  setIsModalOpen,
}: PropsWithChildren<{ setIsModalOpen: (isOpen: boolean) => void }>) => {
  const handleClose = (e: React.SyntheticEvent<HTMLElement>) => {
    if (
      e.target instanceof HTMLElement &&
      (e.target.className === classes.close || e.target.className === classes.overlay)
    )
      setIsModalOpen(false);
  };
  return (
    <div className={classes.overlay} onClick={handleClose}>
      <div className={classes.content}>
        <span className={classes.close}>x</span>
        {children}
      </div>
    </div>
  );
};

export default Overlay;
