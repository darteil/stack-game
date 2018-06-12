import React from 'react';
import ReactDOM from 'react-dom';
import styles from './style.css';
import img from './imageAnime.jpg'

ReactDOM.render(
  <div>
    <h1 className={styles.head}>Welcome to hell!</h1>
    <img src={img} alt=""/>
  </div>,
  document.getElementById('root')
);
