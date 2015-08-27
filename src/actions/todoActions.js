import * as lodash from 'lodash';
import {
  CREATE_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  DELETE_COMPLETED_TODOS,
  EDIT_TODO,
  SET_VISIBILITY_FILTER,
  TOGGLE_ALL_TODOS
} from "./actionTypes";

export function createTodo(text) {
    return {
        type: CREATE_TODO,
        payload: {
          text: text,
          id: lodash.uniqueId()
        }
    }
}

export function toggleTodo (todo) {
  return {
    type: TOGGLE_TODO,
    payload: {
      todo
    }
  };
}

export function toggleAllTodos() {
  return {
    type: TOGGLE_ALL_TODOS
  };
}

export function deleteTodo (id) {
  return {
    type: DELETE_TODO,
    payload: {
      id: id
    }
  };
}

export function deleteCompletedTodos() {
  return {
    type: DELETE_COMPLETED_TODOS
  };
}

export function editTodo (id, content) {
  return {
    type: EDIT_TODO,
    payload: {
      id: id,
      content: content
    }
  };
}


export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}
