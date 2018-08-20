export const ADD_RECORD = 'ADD_RECORD';
export const SET_TOP_RECORD = 'SET_TOP_RECORD';

export function addRecord(record) {
  return {
    type: ADD_RECORD,
    record
  };
}

export function setTopRecord(count) {
  return {
    type: SET_TOP_RECORD,
    count
  };
}
