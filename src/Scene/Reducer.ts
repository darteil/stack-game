import { IGameDataState, RecordActionTypes, ADD_RECORD, SET_TOP_RECORD } from './types';

const initialState: IGameDataState = {
  versionData: 1,
  listOfRecords: [],
  topRecord: 0,
  topHeightStack: 0
};

export default function GameData(state = initialState, action: RecordActionTypes): IGameDataState {
  switch (action.type) {
    case ADD_RECORD: {
      const newListOfRecords = [...state.listOfRecords];
      newListOfRecords.push(action.record);

      return { ...state, listOfRecords: newListOfRecords };
    }
    case SET_TOP_RECORD: {
      return { ...state, topRecord: action.count, topHeightStack: action.heightStack };
    }
    default:
      return state;
  }
}
