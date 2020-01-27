import { SHOW_MESSAGE, HIDE_MESSAGE } from '../types';
import { showMessage, hideMessage } from '../Actions';

describe('Message actions', () => {
  it('should create an action SHOW_MESSAGE', () => {
    const text = 'Text example';
    const expectedAction = {
      type: SHOW_MESSAGE,
      text
    };
    expect(showMessage(text)).toEqual(expectedAction);
  });

  it('should create an action HIDE_MESSAGE', () => {
    const expectedAction = {
      type: HIDE_MESSAGE
    };
    expect(hideMessage()).toEqual(expectedAction);
  });
});
