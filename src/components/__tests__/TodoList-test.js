import React, { addons } from 'react/addons';
import _ from 'lodash';
import expect from 'expect';
const { TestUtils } = addons;

import TodoList from '../TodoList';

describe('TodoList', () => {

  const mockedTodosVaried = [{
    text: 'abc123',
    complete: false,
    id: 1
  },
  {
    text: 'b2mabcbbd',
    complete: true,
    id: 2
  }];

  const mockedTodosEmpty = []

  describe('rendering', () => {
    let component;

    context(`no todos`, ()=> {

      before(() => {
        component = TestUtils.renderIntoDocument(
          <TodoList
            todos={mockedTodosEmpty}
            editTodo={_.noop}
            markTodoAsComplete={_.noop}
            markAllTodosAsComplete={_.noop}
            deleteTodo={_.noop}
          />
        );
      });

      afterEach(() => {
        React.unmountComponentAtNode(React.findDOMNode(component));
      });

      it(`should render a 'section' element that wraps the component`, () => {
        const sectionComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'section');

        expect(sectionComponent).toExist();
      });

      it(`should not yet render a checkbox element that allows the user to mark all items as complete`, () => {

        const checkboxInputComponent = TestUtils.scryRenderedDOMComponentsWithClass(component, 'toggle-all')
        expect(checkboxInputComponent.length).toEqual(0);
      });


    });

    context(`existing todos`, ()=> {

      before(() => {
        component = TestUtils.renderIntoDocument(
          <TodoList
            todos={mockedTodosVaried}
            editTodo={_.noop}
            markTodoAsComplete={_.noop}
            markAllTodosAsComplete={_.noop}
            deleteTodo={_.noop}
          />
        );
      });

      afterEach(() => {
        React.unmountComponentAtNode(React.findDOMNode(component));
      });

      it(`should render a 'section' element that wraps the component`, () => {
        const sectionComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'section');

        expect(sectionComponent).toExist();
      });

      it(`should render the correct number of list elements (${mockedTodosVaried.length})`, () => {
        const liComponents = TestUtils.scryRenderedDOMComponentsWithTag(component, 'li');

        expect(liComponents).toExist();
        expect(liComponents.length).toEqual(mockedTodosVaried.length);
      });

      it(`should render a checkbox element that allows the user to mark all items as complete`, () => {

        const checkboxInputComponent = TestUtils.findRenderedDOMComponentWithClass(component, 'toggle-all')
        expect(checkboxInputComponent).toExist();
      });

    });

  });

  describe('events', () => {
    let component;

    beforeEach(() => {

      // V these weren't showing up in the context of the texts V
      // const onDeleteStub = sinon.stub();
      // const onEditStub = sinon.stub();
      // const onMarkCompleteStub = sinon.stub();
      // const onMarkAllTodosCompleteStub = sinon.stub();

      // component = TestUtils.renderIntoDocument(

      //   <TodoList
      //     todos={mockedTodosVaried}
      //     editTodo={onEditStub}
      //     markTodoAsComplete={onMarkCompleteStub}
      //     markAllTodosAsComplete={onMarkAllTodosCompleteStub}
      //     deleteTodo={onDeleteStub}
      //   />
      // );
    });

    afterEach(() => {
      React.unmountComponentAtNode(React.findDOMNode(component));
    });

    it(`should mark all todos as complete when the appropriate button
        is clicked`, () => {

      const onDeleteStub = sinon.stub();
      const onEditStub = sinon.stub();
      const onMarkCompleteStub = sinon.stub();
      const onMarkAllTodosCompleteStub = sinon.stub();

      component = TestUtils.renderIntoDocument(

        <TodoList
          todos={mockedTodosVaried}
          editTodo={onEditStub}
          markTodoAsComplete={onMarkCompleteStub}
          markAllTodosAsComplete={onMarkAllTodosCompleteStub}
          deleteTodo={onDeleteStub}
        />
      );

      const checkboxInputComponent = TestUtils.findRenderedDOMComponentWithClass(component, 'toggle-all')

      expect(checkboxInputComponent).toExist();
      expect(onMarkAllTodosCompleteStub.called).toBe(false);

      // v should this simulate a click explicitly? v
      TestUtils.Simulate.change(checkboxInputComponent);

      expect(onMarkAllTodosCompleteStub.called).toBe(true);
    });
  });

});
