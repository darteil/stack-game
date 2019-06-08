import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from './List';

const ListOfRecords = props => <List {...props} />;

ListOfRecords.propTypes = {
  listOfRecords: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      time: PropTypes.string,
      count: PropTypes.number,
      heightStack: PropTypes.number
    })
  ),
  topRecord: PropTypes.number.isRequired,
  topHeight: PropTypes.number.isRequired
};

ListOfRecords.defaultProps = {
  listOfRecords: []
};

const mapStateToProps = state => ({
  listOfRecords: state.GameData.listOfRecords,
  topRecord: state.GameData.topRecord,
  topHeight: state.GameData.topHeightStack
});

export default connect(mapStateToProps)(ListOfRecords);
