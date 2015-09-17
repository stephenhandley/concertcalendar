import * as lodash from 'lodash';
import {
  CREATE_TODO,
  MARK_TODO_AS_COMPLETE,
  DELETE_TODO,
  DELETE_COMPLETED_TODOS,
  EDIT_TODO,
  SET_VISIBILITY_FILTER,
  MARK_ALL_TODOS_AS_COMPLETE
} from "./actionTypes";

export function createTodo(text) {
    return {
        type: CREATE_TODO,
        payload: {
          text,
          id: lodash.uniqueId()
        }
    }
}

export function markTodoAsComplete(id) {
  return {
    type: MARK_TODO_AS_COMPLETE,
    payload: {
      id
    }
  };
}

export function markAllTodosAsComplete() {
  return {
    type: MARK_ALL_TODOS_AS_COMPLETE
  };
}

export function deleteTodo (id) {
  return {
    type: DELETE_TODO,
    payload: {
      id
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
      id,
      content
    }
  };
}


export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}
