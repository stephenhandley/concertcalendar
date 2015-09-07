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
          toggleTodo={_.noop}
          deleteTodo={_.noop}
        />
      );
    });

    it(`should render a 'section' element that wraps the component`, () => {
      const sectionComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'section');

      expect(sectionComponent).toExist();
    });

    // it('should render text in label', () => {
    //   const labelComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'label');

    //   expect(labelComponent).toExist();
    //   expect(React.findDOMNode(labelComponent).textContent).toEqual('abc123');
    // });
  });

  // describe('events', () => {
  //   let component;
  //   let deleteTodoCallback;

  //   beforeEach(() => {
  //     deleteTodoCallback = () => {
  //       // Typically we should use "sinon" here
  //       deleteTodoCallback.called = true;
  //     };
  //     deleteTodoCallback.called = false;

  //     component = TestUtils.renderIntoDocument(
  //       <TodoItem
  //         todo={mockedTodo}
  //         editTodo={_.noop}
  //         toggleTodo={_.noop}
  //         deleteTodo={deleteTodoCallback}
  //       />
  //     );
  //   });

  //   it('should trigger deleteTodo', () => {
  //     const buttonComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'button');

  //     expect(deleteTodoCallback.called).toBe(false);

  //     TestUtils.Simulate.click(React.findDOMNode(buttonComponent), 'click');

  //     expect(deleteTodoCallback.called).toBe(true);
  //   });
  // });

});
