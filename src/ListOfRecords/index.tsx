import React from 'react';
import { Record } from './types';
import { connect } from 'react-redux';
import List from './List';

interface IProps {
  listOfRecords: Record[];
  topRecord: number;
  topHeight: number;
}

const ListOfRecords = (props: IProps) => <List {...props} />;

const mapStateToProps = (state: any) => ({
  listOfRecords: state.GameData.listOfRecords,
  topRecord: state.GameData.topRecord,
  topHeight: state.GameData.topHeightStack
});

export default connect(mapStateToProps)(ListOfRecords);
