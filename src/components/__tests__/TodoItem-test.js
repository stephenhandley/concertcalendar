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

  describe('rendering', () => {
    let component;

    before(() => {
      component = TestUtils.renderIntoDocument(
        <TodoItem
          todo={mockedTodo}
          editTodo={_.noop}
          toggleTodo={_.noop}
          deleteTodo={_.noop}
        />
      );
    });

    it('should render li', () => {
      const liComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'li');

      expect(liComponent).toExist();
    });

    it('should render text in label', () => {
      const labelComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'label');

      expect(labelComponent).toExist();
      expect(React.findDOMNode(labelComponent).textContent).toEqual('abc123');
    });
  });

});
