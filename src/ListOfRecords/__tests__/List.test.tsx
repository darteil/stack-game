import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import reducer from '../../Scene/Reducer';
import List from '../';

describe('ListOfRecords component', () => {
  it('should render correctly', () => {
    const mockListOfRecords = [
      {
        id: '1',
        time: 'September 24th 2018, 16:15:26',
        count: 3,
        heightStack: 3
      },
      {
        id: '2',
        time: 'September 29th 2018, 16:11:32',
        count: 16,
        heightStack: 17
      }
    ];
    const initialState = {
      GameData: {
        versionData: 1,
        listOfRecords: mockListOfRecords,
        topRecord: 16,
        topHeightStack: 17,
        UI: false
      }
    };

    const mockStore = createStore(combineReducers({ GameData: reducer }), initialState);

    const getWrapper = () =>
      mount(
        <Provider store={mockStore}>
          <List />
        </Provider>
      );

    const wrapper = getWrapper();

    expect(wrapper.find('.result-stats').text()).toEqual('Count: 16 Height stack: 17');
    expect(wrapper.find('.list li:first-child').text()).toEqual(
      'September 29th 2018, 16:11:32count: 16height stack: 17'
    );
  });
});
