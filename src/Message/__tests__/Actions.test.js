import * as actions from '../Actions';

describe('Message actions', () => {
  it('should create an action SHOW_MESSAGE', () => {
    const text = 'Text example';
    const expectedAction = {
      type: actions.SHOW_MESSAGE,
      text
    };
    expect(actions.showMessage(text)).toEqual(expectedAction)
  });

  it('should create an action HIDE_MESSAGE', () => {
    const expectedAction = {
      type: actions.HIDE_MESSAGE
    };
    expect(actions.hideMessage()).toEqual(expectedAction)
  })
});
