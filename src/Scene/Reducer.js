import { ADD_RECORD, SET_TOP_RECORD } from './Actions';

const initialState = {
  listOfRecords: [],
  topRecord: 0
};

export default function GameData(state = initialState, action) {
  switch (action.type) {
    case ADD_RECORD: {
      const newListOfRecords = [...state.listOfRecords];
      const record = { ...action.record };

      record.id = newListOfRecords.length + 1;

      newListOfRecords.push(record);

      return { ...state, listOfRecords: newListOfRecords };
    }
    case SET_TOP_RECORD: {
      return { ...state, topRecord: action.count };
    }
    default:
      return state;
  }
}
