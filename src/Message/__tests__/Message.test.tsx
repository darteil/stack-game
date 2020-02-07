import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import reducer from '../Reducer';
import Message from '../';

describe('Message component', () => {
  it('should render correctly', () => {
    const mockMessages = ['First', 'Second'];

    const initialState = {
      Message: {
        messages: mockMessages,
        show: false
      }
    };

    const mockStore = createStore(combineReducers({ Message: reducer }), initialState);

    const getWrapper = () =>
      mount(
        <Provider store={mockStore}>
          <Message />
        </Provider>
      );

    const wrapper = getWrapper();

    expect(wrapper.find('.message > div').text()).toEqual('FirstSecond');
    expect(wrapper.find('.message > div').children()).toHaveLength(2);
  });
});
