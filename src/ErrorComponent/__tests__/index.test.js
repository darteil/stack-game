import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ErrorComponent from 'App/ErrorComponent';


describe('ErrorComponent', () => {
  it('should render correctly', () => {
    const output = shallow(
      <ErrorComponent message="error message" />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
