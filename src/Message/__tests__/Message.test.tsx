import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Message from '../Message';

describe('Message component', () => {
  it('should render correctly', () => {
    const text = ['text example'];
    const handleHide = jest.fn();

    const output = shallow(<Message hideMessage={handleHide} messages={text} />);
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
