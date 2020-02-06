import { ADD_RECORD, SET_TOP_RECORD, TOGGLE_UI, IToggleUI, IAddRecord, ISetTopRecord, Record } from './types';

export function addRecord(record: Record): IAddRecord {
  return {
    type: ADD_RECORD,
    record
  };
}

export function setTopRecord(count: number, heightStack: number): ISetTopRecord {
  return {
    type: SET_TOP_RECORD,
    count,
    heightStack
  };
}

export function toggleUI(): IToggleUI {
  return {
    type: TOGGLE_UI
  };
}
