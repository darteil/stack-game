import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'simplebar';

// eslint-disable-next-line
import '!style-loader!css-loader!simplebar/dist/simplebar.css';

import styles from './styles.css';

class ListOfRecords extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className={styles.wrap}>
        <div className={styles['flex-block']}>
          {
            this.props.listOfRecords.length > 0 &&
            <div className={styles.container} data-simplebar>
              <ul className={styles.list}>
                {
                  this.props.listOfRecords.slice(0).reverse().map(record => (
                    <li key={record.id}>{record.time} <span>{record.count}</span></li>
                  ))
                }
              </ul>
            </div>
          }
          <div className={styles.result}>
            <p>Лучший результат <span>{this.props.topRecord}</span></p>
          </div>
        </div>
      </div>
    );
  }
}

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
