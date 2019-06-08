import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import List from 'App/ListOfRecords/List';

describe('ListOfRecords component', () => {
  it('should render correctly', () => {
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
        heightStack: 16
      }
    ];
    const initialState = {
      GameData: {
        listOfRecords: mockListOfRecords,
        topRecord: 16,
        topHeightStack: 16
      }
    };
    const output = shallow(
      <List
        listOfRecords={initialState.GameData.listOfRecords}
        topHeight={initialState.GameData.topHeightStack}
        topRecord={initialState.GameData.topRecord}
      />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
