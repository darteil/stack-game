import { Record } from '../ListOfRecords/types';

export const ADD_RECORD = 'ADD_RECORD';
export const SET_TOP_RECORD = 'SET_TOP_RECORD';
export const TOGGLE_UI = 'TOGGLE_UI';

export interface IGameDataState {
  versionData: number;
  listOfRecords: Record[];
  topRecord: number;
  topHeightStack: number;
  UI: boolean;
}

export interface IAddRecord {
  type: typeof ADD_RECORD;
  record: Record;
}

export interface ISetTopRecord {
  type: typeof SET_TOP_RECORD;
  count: number;
  heightStack: number;
}

export interface IToggleUI {
  type: typeof TOGGLE_UI;
}

export type RecordActionTypes = IAddRecord | ISetTopRecord | IToggleUI;
