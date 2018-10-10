import React from 'react';
import { addRecord, setTopRecord } from 'App/Scene/Actions';
import { showMessage } from 'App/Message/Actions';
import { connect } from 'react-redux';
import Scene from './Scene';

const SceneContainer = props => <Scene {...props} />;

const mapStateToProps = state => ({
  topRecord: state.GameData.topRecord,
  listOfRecords: state.GameData.listOfRecords
});

const mapDispatchToProps = dispatch => ({
  addRecord: (record) => {
    dispatch(addRecord(record));
  },
  setTopRecord: (record, height) => {
    dispatch(setTopRecord(record, height));
  },
  showMessage: (text) => {
    dispatch(showMessage(text));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SceneContainer);
