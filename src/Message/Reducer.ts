import { IMessageState, SHOW_MESSAGE, HIDE_MESSAGE, MessageActionTypes } from './types';

const initialState: IMessageState = {
  text: '',
  show: false
};

export default function Message(state = initialState, action: MessageActionTypes) {
  switch (action.type) {
    case SHOW_MESSAGE: {
      return { ...state, show: true, text: action.text };
    }
    case HIDE_MESSAGE: {
      return { ...state, show: false, text: '' };
    }
    default:
      return state;
  }
}
