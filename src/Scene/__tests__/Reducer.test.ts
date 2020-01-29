import { SET_TOP_RECORD, ADD_RECORD } from '../types';
import reducer from '../Reducer';

const initialState = {
  versionData: 1,
  listOfRecords: [],
  topRecord: 0,
  topHeightStack: 0
};

const record = {
  id: '10',
  time: 'January 14th 2020, 14:06:51',
  count: 10,
  heightStack: 20
};

describe('Scene reducer', () => {
  it('should handle ADD_RECORD', () => {
    expect(
      reducer(initialState, {
        type: ADD_RECORD,
        record
      })
    ).toEqual({
      ...initialState,
      listOfRecords: [record]
    });
  });

  it('should handle SET_TOP_RECORD', () => {
    expect(
      reducer(initialState, {
        type: SET_TOP_RECORD,
        count: 10,
        heightStack: 10
      })
    ).toEqual({
      ...initialState,
      topRecord: 10,
      topHeightStack: 10
    });
  });
});
