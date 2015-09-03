import expect from 'expect';
import reducer from '../todos.js';
import * as types from '../../actions/actionTypes';

const { SHOW_ALL } = types.VisibilityFilters;

describe('reducers', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      visibilityFilter: SHOW_ALL,
      todos: []
    });
  });

  describe('todos', () => {

      it(`should update the state after a CREATE_TODO action with a new todo`, () => {

        // It should create a todo if the state is empty
        expect(
          reducer([], {
                type: types.CREATE_TODO,
                payload : {
                    text: "Run the tests",
                    id: 1
                }
            }).todos
        ).toEqual([{
          text: 'Run the tests',
          complete: false,
          id: 1
        }]);

        // It should add a todo to the 'todos' component of the state if there are already
        // todos in that part of the state
        expect(
          reducer({
            todos:[{
                text: 'Existing todo',
                complete: false,
                id: 1
            }]
          }, {
                type: types.CREATE_TODO,
                payload : {
                    text: "Run the tests",
                    id: 2
                }
          }).todos
        ).toEqual([{
            text: 'Existing todo',
            complete: false,
            id: 1
          },{
          text: 'Run the tests',
          complete: false,
          id: 2
        }]);
      }); //CREATE_TODO

      it(`should update the state after a TOGGLE_TODO action with a todo that
          has had its 'complete' flag toggled`, () => {

        // It should toggle a given todo's complete flag from false to true by id

        expect(
          reducer({
            todos:[{
                text: 'Existing todo',
                complete: false,
                id: 1
            }]
          }, {
                type: types.TOGGLE_TODO,
                payload : {
                    id: 1
                }
          }).todos
        ).toEqual([{
            text: 'Existing todo',
            complete: true,
            id: 1
        }]);

        // It should toggle a given todo's complete flag from true to false by id

        expect(
          reducer({
            todos:[{
                text: 'Existing todo',
                complete: true,
                id: 1
            }]
          }, {
                type: types.TOGGLE_TODO,
                payload : {
                    id: 1
                }
          }).todos
        ).toEqual([{
            text: 'Existing todo',
            complete: false,
            id: 1
        }]);

      }); //TOGGLE_TODO

     it(`should update the state after an EDIT_TODO action with a todo
         that has had its 'text' field updated`, () => {

        expect(
          reducer({
            todos:[{
                text: 'Existing todo',
                complete: false,
                id: 1
            }]
          }, {
                type: types.EDIT_TODO,
                payload : {
                    id: 1,
                    content: "Updated content"
                }
          }).todos
        ).toEqual([{
            text: 'Updated content',
            complete: false,
            id: 1
        }]);

      }); //EDIT_TODO

     it(`should update the state after a MARK_COMPLETE_ALL_TODOS action with
         all 'complete' flags in all todos toggled to true`, () => {

        expect(
          reducer({
            todos:[{
                text: 'Existing todo number one',
                complete: false,
                id: 1
            },
            {
                text: 'Existing todo number two',
                complete: true,
                id: 2
            }]
          }, {
                type: types.MARK_COMPLETE_ALL_TODOS,
          }).todos
        ).toEqual([{
                text: 'Existing todo number one',
                complete: true,
                id: 1
            },
            {
                text: 'Existing todo number two',
                complete: true,
                id: 2
            }]);

      }); //MARK_COMPLETE_ALL_TODOS

     it(`should update the state after a DELETE_TODO action with a given todo
         removed by id`, () => {

        expect(
          reducer({
            todos:[{
                text: 'Existing todo number one',
                complete: false,
                id: 1
            },
            {
                text: 'Existing todo number two',
                complete: true,
                id: 2
            }]
          }, {
                type: types.DELETE_TODO,
                payload : {
                    id: 2
                }
          }).todos
        ).toEqual([{
                text: 'Existing todo number one',
                complete: false,
                id: 1
            }
           ]);

      }); //DELETE_TODO

      it(`should update the state after a DELETE_COMPLETED_TODOS action
         with all todos with the 'complete' flag set to true removed`, () => {

        expect(
          reducer({
            todos:[{
                text: 'Existing todo number one',
                complete: false,
                id: 1
            },
            {
                text: 'Existing todo number two',
                complete: true,
                id: 2
            },
            {
                text: 'Existing todo number three',
                complete: true,
                id: 2
            },
            {
                text: 'Existing todo number four',
                complete: false,
                id: 2
            }]
          }, {
                type: types.DELETE_COMPLETED_TODOS,
          }).todos
        ).toEqual([{
                text: 'Existing todo number one',
                complete: false,
                id: 1
            },
            {
                text: 'Existing todo number four',
                complete: false,
                id: 2
            }
           ]);

      }); //DELETE_COMPLETED_TODOS

  }); // TODOS

  describe('visabilityFilter', () => {

    it(`should update the state after a VISIBILITY_FILTER action with the new filter`, () => {
        // Pick a random filter to test with
        var filters = Object.keys(types.VisibilityFilters);
        const filter = types.VisibilityFilters[filters[ filters.length * Math.random() << 0]];

        expect(
          reducer({
            visibilityFilter: types.SHOW_ALL
          }, {
                type: types.SET_VISIBILITY_FILTER,
                filter : filter
          }).visibilityFilter
        ).toEqual(filter);
      });
  }); // visibilityFilter

});
