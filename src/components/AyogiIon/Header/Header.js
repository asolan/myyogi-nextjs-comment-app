import React from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';

const Header = props => {
  let links = (
    <ul className="main-header__nav-items">
      <li className="main-header__nav-item">
        <NavLink to="/ayogi">A Yogi</NavLink>
      </li>
      <li className="main-header__nav-item">
        <NavLink to="/ayogichapter/add">Add Comment</NavLink>
      </li>
    </ul>
  );

  if (!props.authenticated) {
    links = ( <ul/> );
      // <ul className="main-header__nav-items">
      //   <li className="main-header__nav-item">
      //     <NavLink to="/auth">Authenticate</NavLink>
      //   </li>
      // </ul>
//    );
  }

  return (
    <header className="main-header">
      <nav className="main-header__nav">{links}</nav>
    </header>
  );
};

export default Header;
