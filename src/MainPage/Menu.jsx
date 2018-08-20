import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.css';


const Menu = () => (
  <div className={styles.menu}>
    <h1>Stack</h1>
    <ul>
      <NavLink exact to="/react" activeClassName={styles.active}>
        <li>
          Game
        </li>
      </NavLink>
      <NavLink to="/react/list-of-records" activeClassName={styles.active}>
        <li>
          List of records
        </li>
      </NavLink>
    </ul>
  </div>
);

export default Menu;
