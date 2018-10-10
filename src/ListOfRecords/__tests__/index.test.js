import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ListOfRecords from '../index';

const mockStore = configureMockStore();

describe('ListOfRecords', () => {
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
        topRecord: 16,
        topHeightStack: 17
      }
    };
    store = mockStore(initialState);
    wrapper = shallow(
      <ListOfRecords store={store} />
    );
  });

  it('check prop', () => {
    expect(wrapper.props().topRecord).toBe(16);
    expect(wrapper.props().topHeight).toBe(17);
    expect(wrapper.props().listOfRecords.length).toBe(2);
  });
});

