import React, { addons } from 'react/addons';
import _ from 'lodash';
import expect from 'expect';
const { TestUtils } = addons;

import TodoList from '../TodoList';

describe('TodoList', () => {

  const mockedTodos = [{
    text: 'abc123',
    complete: false,
    id: 1
  },
  {
    text: 'b2mabcbbd',
    complete: true,
    id: 2
  }];


  describe('rendering', () => {
    let component;

    before(() => {
      component = TestUtils.renderIntoDocument(
        <TodoList
          todos={mockedTodos}
          editTodo={_.noop}
          markTodoAsComplete={_.noop}
          deleteTodo={_.noop}
        />
      );
    });

    it(`should render a 'section' element that wraps the component`, () => {
      const sectionComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'section');

      expect(sectionComponent).toExist();
    });

  });

  describe('events', () => {
    let component;

    beforeEach(() => {
      const onDeleteStub = sinon.stub();
      const onEditStub = sinon.stub();
      const onMarkCompleteStub = sinon.stub();

      component = TestUtils.renderIntoDocument(

        <TodoList
          todos={mockedTodos}
          editTodo={onEditStub}
          markTodoAsComplete={onMarkCompleteStub}
          deleteTodo={onDeleteStub}
        />
      );
    });

    it('should trigger deleteTodo', () => {
      const buttonComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'button');

      expect(onDeleteStub.called).toBe(false);

      TestUtils.Simulate.click(React.findDOMNode(buttonComponent), 'click');

      expect(onDeleteStub.called).toBe(true);
    });
  });

});
