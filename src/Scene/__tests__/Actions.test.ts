import { ADD_RECORD, SET_TOP_RECORD } from '../types';
import { addRecord, setTopRecord } from '../Actions';

describe('Scene actions', () => {
  it('should create an action ADD_RECORD', () => {
    const record = {
      id: '10',
      time: 'January 14th 2020, 14:06:51',
      count: 10,
      heightStack: 20
    };

    const expectedAction = {
      type: ADD_RECORD,
      record
    };
    expect(addRecord(record)).toEqual(expectedAction);
  });

  it('should create an action SET_TOP_RECORD', () => {
    const expectedAction = {
      type: SET_TOP_RECORD,
      count: 10,
      heightStack: 11
    };
    expect(setTopRecord(10, 11)).toEqual(expectedAction);
  });
});
