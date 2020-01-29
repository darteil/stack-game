import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Controls from '../Control';

describe('Message component', () => {
  const onClick = jest.fn();
  const output = shallow(<Controls restartGame={onClick} />);

  it('should render correctly', () => {
    expect(shallowToJson(output)).toMatchSnapshot();
  });

  it('test click event', () => {
    output.find('button').simulate('click');
    expect(onClick.mock.calls.length).toEqual(1);
  });
});
