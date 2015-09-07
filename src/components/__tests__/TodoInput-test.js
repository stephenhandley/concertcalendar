import React, { addons } from 'react/addons';
import _ from 'lodash';
import expect from 'expect';
const { TestUtils } = addons;

import TodoInput from '../TodoInput';

describe('TodoInput', () => {

  const mockedTodo = {
    text: 'abc123',
    complete: false
  };

  describe('rendering', () => {
    let component;

    before(() => {
      component = TestUtils.renderIntoDocument(
        <TodoInput
          text = {mockedTodo.text}
          editing = {false}
          onSave = {_.noop}
        />
      );
    });

    it(`should render an 'input' element that wraps the component`, () => {
      const inputComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'input');

      expect(inputComponent).toExist();
    });

  });

  describe('events', () => {

    it(`should update text from user input`, () => {
      const component = TestUtils.renderIntoDocument(
        <TodoInput
          text = {mockedTodo.text}
          editing = {false}
          onSave = {_.noop}
        />
      );

      const inputComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'input');

      expect(React.findDOMNode(inputComponent).value).toBe(mockedTodo.text);

      TestUtils.Simulate.change(React.findDOMNode(inputComponent), {target: {value: "newValue"}});

      expect(React.findDOMNode(inputComponent).value).toBe("newValue");
    });

    context(`if the Todo is new (props.newTodo: true)`, () => {

      it(`shouldn't call onSave after a blur action`, () => {
        const onSaveStub = sinon.stub();

        const component = TestUtils.renderIntoDocument(
          <TodoInput
            text = {mockedTodo.text}
            editing = {false}
            newTodo = {true}
            onSave = {onSaveStub}
          />
        );

        const inputComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'input');

        expect(onSaveStub.called).toBe(false);

        TestUtils.Simulate.blur(React.findDOMNode(inputComponent));

        expect(onSaveStub.called).toBe(false);
      });

    });

    context(`if the Todo isn't new (props.newTodo: false)`, () => {

      it(`should call onSave after a blur action`, () => {
        const onSaveStub = sinon.stub();

        const component = TestUtils.renderIntoDocument(
          <TodoInput
            text = {mockedTodo.text}
            editing = {false}
            newTodo = {false}
            onSave = {onSaveStub}
          />
        );

        const inputComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'input');

        expect(onSaveStub.called).toBe(false);

        TestUtils.Simulate.blur(React.findDOMNode(inputComponent));

        expect(onSaveStub.called).toBe(true);
      });

    });

  });

});
