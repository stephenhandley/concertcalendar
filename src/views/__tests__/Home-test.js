import React, { addons } from 'react/addons';
import _ from 'lodash';
import expect from 'expect';
import { Provider } from 'react-redux';
import createStore from 'redux/create';
import ApiClient from 'ApiClient';
const client = new ApiClient();

const { TestUtils } = addons;

import Home from '../Home';
import { VisibilityFilters } from  '../../actions/actionTypes';
const {SHOW_ALL, SHOW_INCOMPLETE, SHOW_COMPLETE} = VisibilityFilters;

describe('Home', () => {

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
        complete: true,
        id: 2
      }];

    const mockedTodosEmpty = []


    describe('rendering', () => {
        let component;

        let initStore = createStore(client, {
            todos: {
                visibilityFilter: SHOW_ALL,
                visibleTodos: mockedTodosVaried
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

//.filter(todo => !todo.complete).length;
});
