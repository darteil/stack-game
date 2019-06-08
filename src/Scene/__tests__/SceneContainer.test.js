import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import SceneContainer from '../SceneContainer';

const mockStore = configureMockStore();

describe('SceneContainer', () => {
  let wrapper, store;

  beforeEach(() => {
    const mockListOfRecords = [
      {
        id: 1,
        time: 'September 24th 2018, 16:15:26',
        count: 3,
        heightStack: 3
      },
      {
        id: 2,
        time: 'September 29th 2018, 16:11:32',
        count: 16,
        heightStack: 17
      }
    ];
    const initialState = {
      GameData: {
        listOfRecords: mockListOfRecords,
        topRecord: 16
      }
    };
    store = mockStore(initialState);
    wrapper = shallow(<SceneContainer store={store} />);
  });

  it('check prop', () => {
    expect(wrapper.props().topRecord).toBe(16);
    expect(wrapper.props().listOfRecords.length).toBe(2);
  });
});
