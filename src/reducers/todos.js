import { combineReducers } from 'redux';
import {
  CREATE_TODO,
  TOGGLE_TODO,
  TOGGLE_ALL_TODOS,
  DELETE_TODO,
  DELETE_COMPLETED_TODOS,
  SET_VISIBILITY_FILTER,
  EDIT_TODO,
  VisibilityFilters } from '../actions/actionTypes';
const { SHOW_ALL } = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
  case SET_VISIBILITY_FILTER:
    return action.filter;
  default:
    return state;
  }
}

function todos(state = [], action) {
  // operates on todo array [... {id, text, complete} ...]

  switch (action.type) {

    case CREATE_TODO:
      return [...state, {
        text: action.payload.text,
        complete: false,
        id: action.payload.id
      }];

    case TOGGLE_TODO:
      let completeStatus = !action.payload.todo.complete;
      let index = state.findIndex(todo => action.payload.todo.id === todo.id);
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], {
          complete: completeStatus
        }),
        ...state.slice(index + 1)
      ]

    case EDIT_TODO:
      let index = state.findIndex(todo => action.payload.id === todo.id);
      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], {
          text: action.payload.content
        }),
        ...state.slice(index + 1)
      ]

    case TOGGLE_ALL_TODOS:
      const allAreComplete = state.every(todo => todo.complete);
      return [...state.map(todo => ({...todo, complete: !allAreComplete }))];

    case DELETE_TODO:
      return [...state.filter(todo => action.payload.id != todo.id)];

    case DELETE_COMPLETED_TODOS:
      return [...state.filter(todo=> todo.complete === false)];

    default:
      return state;
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
});

export default todoApp;
