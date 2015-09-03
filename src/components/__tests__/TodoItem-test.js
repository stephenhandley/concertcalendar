import React, { addons } from 'react/addons';
import _ from 'lodash';
import expect from 'expect';
const { TestUtils } = addons;

import TodoItem from '../TodoItem';

describe('TodoItem', () => {

  const mockedTodo = {
    text: 'abc123',
    complete: false
  };

  it('should render li', () => {
    const component = TestUtils.renderIntoDocument(
      <TodoItem
        todo={mockedTodo}
        editTodo={_.noop}
        toggleTodo={_.noop}
        deleteTodo={_.noop}
      />
    );

    const domEl = TestUtils.findRenderedDOMComponentWithTag(component, 'li');

    expect(domEl).toExist();
  });

});
