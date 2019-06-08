import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Scene from '../Scene';

describe('Scene component', () => {
  const props = {
    listOfRecords: [
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
    ],
    topRecord: 16,
    showMessage: jest.fn(),
    setTopRecord: jest.fn(),
    addRecord: jest.fn()
  };

  const output = shallow(<Scene {...props} />, { disableLifecycleMethods: true });

  it('should render correctly', () => {
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
