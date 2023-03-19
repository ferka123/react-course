import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './styles/header.scss';

export default class Header extends Component<{ currentPage: string }> {
  render() {
    return (
      <header className="header">
        <nav className="nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About Us</NavLink>
        </nav>
        <h2 className="header__current">Current: {this.props.currentPage}</h2>
      </header>
    );
  }
}
