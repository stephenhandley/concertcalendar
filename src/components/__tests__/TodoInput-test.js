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
    let component;

    beforeEach(() => {

      component = TestUtils.renderIntoDocument(
        <TodoInput
          text = {mockedTodo.text}
          editing = {false}
          onSave = {_.noop}
        />
      );
    });

    it(`should update text from user input`, () => {
      const inputComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'input');

      expect(React.findDOMNode(inputComponent).value).toBe(mockedTodo.text);

      TestUtils.Simulate.change(React.findDOMNode(inputComponent), {target: {value: "newValue"}});

      expect(React.findDOMNode(inputComponent).value).toBe("newValue");
    });
  });

});
