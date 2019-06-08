import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.css';

const Menu = () => (
  <div className={styles.menu}>
    <ul>
      <NavLink exact to="/" activeClassName={styles.active}>
        <li>Game</li>
      </NavLink>
      <NavLink to="/list-of-records" activeClassName={styles.active}>
        <li>List of records</li>
      </NavLink>
    </ul>
  </div>
);

export default Menu;
