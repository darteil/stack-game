import { SHOW_MESSAGE, HIDE_MESSAGE } from '../types';
import reducer from '../Reducer';

const initialState = {
  messages: [],
  show: false
};

describe('message reducer', () => {
  it('should handle SHOW_MESSAGE', () => {
    expect(
      reducer(initialState, {
        type: SHOW_MESSAGE,
        messages: ['Text example']
      })
    ).toEqual({
      messages: ['Text example'],
      show: true
    });
  });

  it('should handle HIDE_MESSAGE', () => {
    const state = {
      messages: ['Text example'],
      show: true
    };

    expect(
      reducer(state, {
        type: HIDE_MESSAGE
      })
    ).toEqual({
      messages: [],
      show: false
    });
  });
});
