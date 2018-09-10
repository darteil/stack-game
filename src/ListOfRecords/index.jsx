import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'simplebar';

// eslint-disable-next-line
import '!style-loader!css-loader!simplebar/dist/simplebar.css';
import styles from './styles.css';

const ListOfRecords = props => (
  <div className={styles.wrap}>
    <div className={styles['flex-block']}>
      <div className={styles.result}>
        <p>Best result: {props.topRecord}</p>
      </div>
      {
        props.listOfRecords.length > 0 &&
        <div className={styles.container} data-simplebar>
          <ul className={styles.list}>
            {
              props.listOfRecords.slice(0).reverse().map(record => (
                <li key={record.id}>{record.time} <span>{record.count}</span></li>
              ))
            }
          </ul>
        </div>
      }
    </div>
  </div>
);

ListOfRecords.propTypes = {
  listOfRecords: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    time: PropTypes.string,
    count: PropTypes.number
  })),
  topRecord: PropTypes.number.isRequired
};

ListOfRecords.defaultProps = {
  listOfRecords: []
};

const mapStateToProps = state => ({
  listOfRecords: state.GameData.listOfRecords,
  topRecord: state.GameData.topRecord
});

export default connect(mapStateToProps)(ListOfRecords);
