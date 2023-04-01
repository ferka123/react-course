import { useState, useEffect } from 'react';
import './styles/toast.scss';

export default function Toast({ message, duration }: { message: string; duration: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const id = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(id);
  }, [message, duration]);

  return visible ? <div className="toast">{message}</div> : null;
}
