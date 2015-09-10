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
          markTodoAsComplete={_.noop}
          deleteTodo={_.noop}
        />
      );
    });

    it('should render the element', () => {
      const liComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'li');

      expect(liComponent).toExist();
    });

    it('should render text in label', () => {
      const labelComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'label');

      expect(labelComponent).toExist();
      expect(React.findDOMNode(labelComponent).textContent).toEqual('abc123');
    });
  });

  describe('events', () => {
    let component;
    let deleteTodoCallback = sinon.stub();

    beforeEach(() => {
      const component = TestUtils.renderIntoDocument(
        <TodoItem
          todo={mockedTodo}
          editTodo={_.noop}
          markTodoAsComplete={_.noop}
          deleteTodo={deleteTodoCallback}
        />
      );
    });

    it(`should trigger deleteTodo if a user clicks on the delete button`, () => {
      const buttonComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'button');

      expect(deleteTodoCallback.called).toBe(false);

      TestUtils.Simulate.click(React.findDOMNode(buttonComponent), 'click');

      expect(deleteTodoCallback.called).toBe(true);
    });

    it(`should change the editing state to be true if a user double-clicks
        on the todo`, () => {

      const inputComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'input');

      dump(inputComponent.props)

      // expect(React.findDOMNode(inputComponent).value).toBe(mockedTodo.text);

      // TestUtils.Simulate.change(React.findDOMNode(inputComponent), {target: {value: "newValue"}});

      // expect(React.findDOMNode(inputComponent).value).toBe("newValue");
    });
  });

});
