import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Menu from 'App/MainPage/Menu';

describe('Menu', () => {
  it('should render correctly', () => {
    const output = shallow(<Menu />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
