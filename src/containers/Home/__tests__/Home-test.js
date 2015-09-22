import React, { Children, addons } from 'react/addons';
import _ from 'lodash';
import expect from 'expect';
import { Provider } from 'react-redux';
import createStore from 'redux/create';
import ApiClient from '../../../helpers/ApiClient';
const client = new ApiClient();
const { TestUtils } = addons;

import Home from '../Home';
import { VisibilityFilters } from  '../../../actions/actionTypes';
import * as TodoActions from '../../../actions/todoActions';
const {SHOW_ALL, SHOW_INCOMPLETE, SHOW_COMPLETE} = VisibilityFilters;

import {selectTodos} from '../Home';

describe('Home', () => {

    const mockedTodosVaried = {
      SHOW_ALL: [{
        text: 'abc123',
        complete: false,
        id: 1
      },
      {
        text: 'b2mabcbbd',
        complete: true,
        id: 2
      }], SHOW_COMPLETE: [{
        text: 'b2mabcbbd',
        complete: true,
        id: 2
      }], SHOW_INCOMPLETE: [{
        text: 'abc123',
        complete: false,
        id: 1
      }]
    };

    const mockedTodosComplete = [{
        text: 'abc123',
        complete: true,
        id: 1
      },
      {
        text: 'b2mabcbbd',
        complete: true,
        id: 2
      }];

    const mockedTodosIncomplete = [{
        text: 'abc123',
        complete: false,
        id: 1
      },
      {
        text: 'b2mabcbbd',
        complete: false,
        id: 2
      }];

    const mockedTodosEmpty = []


    describe('rendering', () => {
        let component;

        let initStore = createStore(client, {
            todos: {
                visibilityFilter: SHOW_ALL,
                visibleTodos: mockedTodosVaried["SHOW_ALL"]
            }
        });

        before(() => {
            component = TestUtils.renderIntoDocument(
              <Provider store={initStore} key="provider">
                {() => <Home />}
              </Provider>
            );
        });

        afterEach(() => {
            React.unmountComponentAtNode(React.findDOMNode(component));
        });

        it(`should render a 'div' element that wraps the component`, () => {
            const divComponent = TestUtils.findRenderedDOMComponentWithTag(component, 'div');

            expect(divComponent).toExist();
        });


    });

    describe('updating state', () => {

      it(`should update todo state based on the current filter`, () => {

        expect(selectTodos(mockedTodosVaried["SHOW_ALL"], "SHOW_ALL")).toEqual(mockedTodosVaried["SHOW_ALL"])
        expect(selectTodos(mockedTodosVaried["SHOW_ALL"], "SHOW_COMPLETE")).toEqual(mockedTodosVaried["SHOW_COMPLETE"])
        expect(selectTodos(mockedTodosVaried["SHOW_ALL"], "SHOW_INCOMPLETE")).toEqual(mockedTodosVaried["SHOW_INCOMPLETE"])

      });

    });

});
