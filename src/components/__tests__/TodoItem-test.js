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

  describe('initial rendering', () => {
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

    it('should render the div with initial content ({editing = false})', () => {
      const divComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'div');

      expect(divComponent).toExist();
    });

    it('should render correct text in label', () => {
      const labelComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'label');

      expect(labelComponent).toExist();
      expect(React.findDOMNode(labelComponent).textContent).toEqual('abc123');
    });
  });

  describe('events', () => {
    let component;
    let deleteTodoStub = sinon.stub();

    beforeEach(() => {

      component = TestUtils.renderIntoDocument(
        <TodoItem
          todo={mockedTodo}
          editTodo={_.noop}
          markTodoAsComplete={_.noop}
          deleteTodo={deleteTodoStub}
        />
      );
    });

    afterEach(() => {
      React.unmountComponentAtNode(React.findDOMNode(component));
    });

    it(`should trigger deleteTodo if a user clicks on the delete button`, () => {

      const buttonComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'button');

      expect(deleteTodoStub.called).toBe(false);

      TestUtils.Simulate.click(React.findDOMNode(buttonComponent), 'click');

      expect(deleteTodoStub.called).toBe(true);
    });

    it(`should render a 'TodoInput' component if a user double-clicks
        on the todo`, () => {

      const renderer = TestUtils.createRenderer();
      renderer.render(
        <TodoItem
          todo={mockedTodo}
          editTodo={_.noop}
          markTodoAsComplete={_.noop}
          deleteTodo={deleteTodoStub}
        />
      );

      let component = renderer.getRenderOutput();
      let divComponent = Children.only(component.props.children);

      expect(component.type).toEqual('li');
      expect(divComponent.type).toEqual('div');

      let labelComponent = divComponent.props.children[0];
      // v Do you want to use a double-click event here? v
      labelComponent.props.onDoubleClick();

      // TestUtils.Simulate.doubleClick(labelComponent); won't work...

      component = renderer.getRenderOutput();

      let todoInputComponent = Children.only(component.props.children);

      expect(todoInputComponent.type).toEqual(TodoInput);
    });

    context("editing state", ()=> {

      it(`should delete the todo and reset the editing state (to {editing = false})
          if a user sets the text length to be 0 and triggers save`, () => {

        const renderer = TestUtils.createRenderer();
        let deleteTodoStub = sinon.stub();

        renderer.render(
          <TodoItem
            todo={mockedTodo}
            editTodo={_.noop}
            markTodoAsComplete={_.noop}
            deleteTodo={deleteTodoStub}
          />
        );

        // render the initial component and expect it to have a 'div' element
        let component = renderer.getRenderOutput();
        let divComponent = Children.only(component.props.children);
        expect(component.type).toEqual('li');
        expect(divComponent.type).toEqual('div');

        let labelComponent = divComponent.props.children[0];

        // call the double-click method on the 'label' component and expect
        // the 'div' to be replaced with a 'TodoInput'
        labelComponent.props.onDoubleClick();

        component = renderer.getRenderOutput();
        let todoInputComponent = Children.only(component.props.children);
        expect(todoInputComponent.type).toEqual(TodoInput);
        expect(deleteTodoStub.called).toBe(false);

        // save an empty string and expect the todo to be deleted
        // and for the 'TodoInput' component to be replaced by 'div'
        todoInputComponent.props.onSave('')

        expect(deleteTodoStub.called).toBe(true);

        component = renderer.getRenderOutput();
        expect(component.type).toEqual('li');
        expect(divComponent.type).toEqual('div');

      });

      it(`should edit the todo and reset the editing state (to {editing = false})
          if a user sets the text length to be greater than 0 and triggers save`, () => {

        const renderer = TestUtils.createRenderer();
        let editTodoStub = sinon.stub();

        renderer.render(
          <TodoItem
            todo={mockedTodo}
            editTodo={editTodoStub}
            markTodoAsComplete={_.noop}
            deleteTodo={_.noop}
          />
        );

        // render the initial component and expect it to have a 'div' element
        let component = renderer.getRenderOutput();
        let divComponent = Children.only(component.props.children);
        expect(component.type).toEqual('li');
        expect(divComponent.type).toEqual('div');

        let labelComponent = divComponent.props.children[0];

        // call the double-click method on the 'label' component and expect
        // the 'div' to be replaced with a 'TodoInput'
        labelComponent.props.onDoubleClick();

        component = renderer.getRenderOutput();
        let todoInputComponent = Children.only(component.props.children);
        expect(todoInputComponent.type).toEqual(TodoInput);
        expect(editTodoStub.called).toBe(false);

        // save an arbitrary string and expect the todo to be edited
        // and for the 'TodoInput' component to be replaced by 'div'
        todoInputComponent.props.onSave('abcbbd')

        expect(editTodoStub.called).toBe(true);

        component = renderer.getRenderOutput();
        expect(component.type).toEqual('li');
        expect(divComponent.type).toEqual('div');

      });

    });

  });

});
