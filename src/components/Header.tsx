import { NavLink, useLocation } from 'react-router-dom';
import './styles/header.scss';

interface NavLinks {
  [key: string]: string | undefined;
}

export default function Header() {
  const navLinks: NavLinks = { '/': 'Home', '/about': 'About Us', '/forms': 'Forms' };
  const location = useLocation();
  return (
    <header className="header">
      <nav className="nav">
        {Object.entries(navLinks).map(([link, linkName], index) => {
          return (
            <NavLink key={index} to={link}>
              {linkName}
            </NavLink>
          );
        })}
      </nav>
      <h2 className="header__current">Current: {navLinks[location.pathname] ?? 'not found'}</h2>
    </header>
  );
}
