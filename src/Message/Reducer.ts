import { IMessageState, SHOW_MESSAGE, HIDE_MESSAGE, MessageActionTypes } from './types';

const initialState: IMessageState = {
  messages: [],
  show: false
};

export default function Message(state = initialState, action: MessageActionTypes) {
  switch (action.type) {
    case SHOW_MESSAGE: {
      return { ...state, show: true, messages: action.messages };
    }
    case HIDE_MESSAGE: {
      return { ...state, show: false, messages: [] };
    }
    default:
      return state;
  }
}
