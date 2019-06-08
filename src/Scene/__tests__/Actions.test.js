import * as actions from '../Actions';

describe('Scene actions', () => {
  it('should create an action ADD_RECORD', () => {
    const expectedAction = {
      type: actions.ADD_RECORD,
      record: {}
    };
    expect(actions.addRecord({})).toEqual(expectedAction);
  });

  it('should create an action SET_TOP_RECORD', () => {
    const expectedAction = {
      type: actions.SET_TOP_RECORD,
      count: 10,
      heightStack: 11
    };
    expect(actions.setTopRecord(10, 11)).toEqual(expectedAction);
  });
});
