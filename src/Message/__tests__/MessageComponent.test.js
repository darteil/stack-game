import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import MessageComponent from 'App/Message/MessageComponent';


describe('Message component', () => {
  it('should render correctly', () => {
    const text = 'text example';
    const handleHide = jest.fn();

    const output = shallow(
      <MessageComponent hideMessage={handleHide} text={text} />
    );
    expect(shallowToJson(output)).toMatchSnapshot();
  });
});
