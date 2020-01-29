import { Record } from '../ListOfRecords/types';
import { ADD_RECORD, SET_TOP_RECORD, IAddRecord, ISetTopRecord } from './types';

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
