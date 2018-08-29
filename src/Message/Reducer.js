import { SHOW_MESSAGE, HIDE_MESSAGE } from './Actions';

const initialState = {
  text: '',
  show: false
};

export default function Message(state = initialState, action) {
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
