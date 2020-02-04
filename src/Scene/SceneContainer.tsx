import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { addRecord, setTopRecord, toggleUI } from './Actions';
import { showMessage } from '../Message/Actions';
import { Record } from '../ListOfRecords/types';
import { AppState } from '../store';
import Scene from './Scene';

export interface ISceneProps {
  addRecord: (record: Record) => void;
  setTopRecord: (count: number, height: number) => void;
  showMessage: (...text: string[]) => void;
  toggleUI: () => void;
  topRecord: number;
  listOfRecords: Record[];
  UI: boolean;
}

const SceneComponent = (props: ISceneProps) => <Scene {...props} />;

const mapStateToProps = (state: AppState) => ({
  topRecord: state.GameData.topRecord,
  listOfRecords: state.GameData.listOfRecords,
  UI: state.GameData.UI
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addRecord: (record: Record) => {
    dispatch(addRecord(record));
  },
  setTopRecord: (count: number, height: number) => {
    dispatch(setTopRecord(count, height));
  },
  showMessage: (...messages: string[]) => {
    dispatch(showMessage(...messages));
  },
  toggleUI: () => {
    dispatch(toggleUI());
  }
});

export const SceneContainer = connect(mapStateToProps, mapDispatchToProps)(SceneComponent);
