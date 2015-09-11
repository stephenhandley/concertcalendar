import React, { Children, addons } from 'react/addons';
import _ from 'lodash';
import expect from 'expect';
const { TestUtils } = addons;

import TodoItem from '../TodoItem';
import TodoInput from '../TodoInput';

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

    afterEach(() => {
      React.unmountComponentAtNode(React.findDOMNode(component));
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
      component = TestUtils.renderIntoDocument(
        <TodoItem
          todo={mockedTodo}
          editTodo={_.noop}
          markTodoAsComplete={_.noop}
          deleteTodo={deleteTodoCallback}
        />
      );
    });

    afterEach(() => {
      React.unmountComponentAtNode(React.findDOMNode(component));
    });

    it(`should trigger deleteTodo if a user clicks on the delete button`, () => {
      const buttonComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'button');

      expect(deleteTodoCallback.called).toBe(false);

      TestUtils.Simulate.click(React.findDOMNode(buttonComponent), 'click');

      expect(deleteTodoCallback.called).toBe(true);
    });

    it(`should change the editing state to be true if a user double-clicks
        on the todo`, () => {

      const renderer = TestUtils.createRenderer();
      renderer.render(
        <TodoItem
          todo={mockedTodo}
          editTodo={_.noop}
          markTodoAsComplete={_.noop}
          deleteTodo={deleteTodoCallback}
        />
      );

      let component = renderer.getRenderOutput();
      let divComponent = Children.only(component.props.children);

      expect(component.type).toEqual('li');
      expect(divComponent.type).toEqual('div');

      let labelComponent = divComponent.props.children[0];
      labelComponent.props.onDoubleClick();

      component = renderer.getRenderOutput();

      let todoInputComponent = Children.only(component.props.children);

      expect(todoInputComponent.type).toEqual(TodoInput);
    });

  });

});
