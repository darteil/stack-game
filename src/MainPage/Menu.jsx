import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.css';


const Menu = () => (
  <div className={styles.menu}>
    <h1>Stack</h1>
    <ul>
      <NavLink exact to={process.env.SUB_ROUTE || '/'} activeClassName={styles.active}>
        <li>
          Game
        </li>
      </NavLink>
      <NavLink to={`${process.env.SUB_ROUTE}/list-of-records` || '/list-of-records`'} activeClassName={styles.active}>
        <li>
          List of records
        </li>
      </NavLink>
    </ul>
  </div>
);

export default Menu;
