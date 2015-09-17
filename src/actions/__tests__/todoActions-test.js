import expect from 'expect';
import * as actions from '../todoActions';
import * as types from '../actionTypes';

describe('actions', () => {
  it('should create an action to create a todo', () => {
    const text = 'Finish docs';
    const expectedAction = {
      type: types.CREATE_TODO,
      payload: {
        text
      }
    };
    const actualAction = actions.createTodo(text);
    expect(actualAction.type).toEqual(expectedAction.type);
    expect(actualAction.payload.text).toEqual(expectedAction.payload.text);
  });

  it('should create an action to markComplete a todo', () => {
    const id = 1;
    const expectedAction = {
      type: types.MARK_TODO_AS_COMPLETE,
      payload: {
        id
      }
    };
    const actualAction = actions.markTodoAsComplete(id);
    expect(actualAction).toEqual(expectedAction);
  });

  it('should create an action to mark all todos as complete', () => {
    const expectedAction = {
      type: types.MARK_ALL_TODOS_AS_COMPLETE,
    };
    const actualAction = actions.markAllTodosAsComplete();
    expect(actualAction).toEqual(expectedAction);
  });

  it('should create an action to delete a todo', () => {
    const id = 1;
    const expectedAction = {
      type: types.DELETE_TODO,
      payload: {
        id
      }
    };
    const actualAction = actions.deleteTodo(id);
    expect(actualAction).toEqual(expectedAction);
  });

  it('should create an action to delete all completed todos', () => {
    const expectedAction = {
      type: types.DELETE_COMPLETED_TODOS,
    };
    const actualAction = actions.deleteCompletedTodos();
    expect(actualAction).toEqual(expectedAction);
  });

  it('should create an action to edit an existing todo', () => {
    const id = 1;
    const content = "replacement text";
    const expectedAction = {
      type: types.EDIT_TODO,
      payload: {
        id,
        content
      }
    };
    const actualAction = actions.editTodo(id, content);
    expect(actualAction).toEqual(expectedAction);
  });

  it('should create an action to update a visibility filter', () => {
    // Pick a random filter to test with
    var filters = Object.keys(types.VisibilityFilters);
    const filter = types.VisibilityFilters[filters[ filters.length * Math.random() << 0]];

    const expectedAction = {
      type: types.SET_VISIBILITY_FILTER,
      filter
    };
    const actualAction = actions.setVisibilityFilter(filter);
    expect(actualAction).toEqual(expectedAction);
  });

});

