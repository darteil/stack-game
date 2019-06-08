import { SET_TOP_RECORD, ADD_RECORD } from '../Actions';
import reducer from '../Reducer';

const initialState = {
  versionData: 1,
  listOfRecords: [],
  topRecord: 0,
  topHeightStack: 0
};

describe('Scene reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle ADD_RECORD', () => {
    expect(
      reducer(initialState, {
        type: ADD_RECORD,
        record: {}
      })
    ).toEqual({
      ...initialState,
      listOfRecords: [{ id: 1 }]
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
