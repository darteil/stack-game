import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const List = props => (
  <div className={styles.wrap}>
    <div className={styles['flex-block']}>
      <div className={styles.result}>
        <p>Best result</p>
        <p className={styles['result-stats']}>
          Count: <span>{props.topRecord}</span> Height stack: <span>{props.topHeight}</span>
        </p>
      </div>
      {
        props.listOfRecords.length > 0 &&
        <div className={styles.container}>
          <ul className={styles.list}>
            {
              props.listOfRecords.slice(0).reverse().map(record => (
                <li key={record.id}>
                  {record.time}
                  <div>
                    <span>count: {record.count}</span>
                    <span>height stack: {record.heightStack}</span>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      }
    </div>
  </div>
);

List.propTypes = {
  listOfRecords: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    time: PropTypes.string,
    count: PropTypes.number,
    heightStack: PropTypes.number
  })),
  topRecord: PropTypes.number.isRequired,
  topHeight: PropTypes.number.isRequired
};

List.defaultProps = {
  listOfRecords: []
};

export default List;
