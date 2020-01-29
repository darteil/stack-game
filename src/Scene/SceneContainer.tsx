import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { addRecord, setTopRecord } from './Actions';
import { showMessage } from '../Message/Actions';
import { Record } from '../ListOfRecords/types';
import { AppState } from '../store';
import Scene from './Scene';

interface IProps {
  topRecord: number;
  listOfRecords: Record[];
  addRecord: (record: Record) => void;
  setTopRecord: (count: number, height: number) => void;
  showMessage: (text: string) => void;
}

const SceneContainer = (props: IProps) => <Scene {...props} />;

const mapStateToProps = (state: AppState) => ({
  topRecord: state.GameData.topRecord,
  listOfRecords: state.GameData.listOfRecords
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addRecord: (record: Record) => {
    dispatch(addRecord(record));
  },
  setTopRecord: (count: number, height: number) => {
    dispatch(setTopRecord(count, height));
  },
  showMessage: (text: string) => {
    dispatch(showMessage(text));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SceneContainer);
