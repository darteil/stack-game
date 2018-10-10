import { SHOW_MESSAGE, HIDE_MESSAGE } from '../Actions';
import reducer from '../Reducer';

const initialState = {
  text: '',
  show: false
};

describe('message reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });

  it('should handle SHOW_MESSAGE', () => {
    expect(reducer(initialState, {
      type: SHOW_MESSAGE,
      text: 'Text example'
    })).toEqual({
      text: 'Text example',
      show: true
    })
  });

  it('should handle HIDE_MESSAGE', () => {
    const state = {
      text: 'Text example',
      show: true
    };

    expect(reducer(state, {
      type: HIDE_MESSAGE
    })).toEqual({
      text: '',
      show: false
    })
  });
});
