import { SHOW_MESSAGE, HIDE_MESSAGE } from '../types';
import { showMessage, hideMessage } from '../Actions';

describe('Message actions', () => {
  it('should create an action SHOW_MESSAGE', () => {
    const text1 = 'Text example';
    const text2 = 'Text example 2';

    const expectedAction = {
      type: SHOW_MESSAGE,
      messages: ['Text example', 'Text example 2']
    };

    expect(showMessage(text1, text2)).toEqual(expectedAction);
  });

  it('should create an action HIDE_MESSAGE', () => {
    const expectedAction = {
      type: HIDE_MESSAGE
    };
    expect(hideMessage()).toEqual(expectedAction);
  });
});
