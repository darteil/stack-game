import { DEMO } from './actions';

const initialState = {
  temp: true
};

export default function MainReducer(state = initialState, action) {
  switch (action.type) {
    case DEMO: {
      return { ...state, temp: false };
    }
    default:
      return state;
  }
}
