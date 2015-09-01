# TODOs

This is a todo list workplace for Tom and Aaron to discuss about.

## Roadmap in Email

For the first step, we will do:
* Starting from a boilerplate: https://github.com/erikras/react-redux-universal-hot-example
* Ending to a TODO-MVC example: https://github.com/gaearon/redux/tree/master/examples/todomvc

### Steps are like

    1. Try to analysis the user story request
    2. Turn them into a list of "actions", that's the actions component in flux context
    3. Add stores to handle actions and change data accordingly
    4. Build react components with dummy data
    5. Build react "containers" and connect them with flux actions/stores

    - We've done this in the first session (7/10)

### For the next step, we will try to:

    + We will do this in the second session (7/16)

    - Explain how require/import css works in TODOMVC
    - Create some dummy data endpoints for our api server
    - Connect them to the front-end: flux actions should call them to get/save data
    - Replace those dummy data in the endpoints with real sql operations
      * a. Setup a ORM in nodejs using bookshelf.js/sequelize
      * b. Using ORM in api routes handlers

### For the final step, we may:

    + TBD

After we've done this, we'll know how to turn user stories into running applications.

## Workflows

1. A user should be able to enter todos
2. A user should be able to update or delete todos
3. A user should be able to mark todos as complete
4. A user should be able to sort todos by status

## User Stories

Let's use the reference implementation of TODO-MVC of [React](http://todomvc.com/examples/react/#/).

X. A user can see an input box to create a new todo
 x After typed in something in the input, one can press enter to create a new todo. The generated new todo will be appear on the list below
 x A user can double-click on a exiting TODO to edit it.
X. A user can see a list of todos
 x The list is sorted by created time, oldest on the top
X.  A user can mark todos as complete/incomplete
 x A user can mark a todo as complete
 x A user can mark a todo as incomplete
 x When marked/unmarked, the total size of incomplete todos will change and be shown in the bottom-left corner
 x A user can mark all todos as complete by selecting a carat on the left-hand side of the search bar
X. A user can filter the list of todos by: All, Active, Complete
X. A user can delete todos
 x A user can delete an individual todo by pressing an “x” button next to it
 x A user can mass delete todos that are completed using a “Clear completed” button in the bottom right corner to remove all completed todos

- consider refactoring in flowtype/flowcheck and immutablejs (wait for redux 1.0) and add proctypes validation, look into gulp, what to move into stores, tests
- hook up server-side rendering
- testing?

# Actions

### ActionTypes (constant string)
    - SET_VISIBILITY_FILTER

    - CREATE_TODO
    - TOGGLE_TODO
    - TOGGLE_ALL_TODOS
    - DELETE_TODO
    - DELETE_COMPLETED_TODOS
    - EDIT_TODO    

## Actions (obj[function])
    -setVisibilityFilter(filter)

    - createTodo(todo={})
    - toggleTodo(id)
    - toggleAllTodos()
    - deleteTodo(id)
    - deleteCompletedTodos()
    - editTodo(id, content)

# Dispatcher

*Handled by Redux*

# Store

## Stores - Stores
    + todos.js
        + CREATE_TODO
        + TOGGLE_TODO
        + TOGGLE_ALL_TODOS
        + DELETE_TODO
        + DELETE_COMPLETED_TODOS
        + EDIT_TODO

# Views

    case CREATE_TODO <-store- CREATE_TODO <-view trigger-
    ---
    createTodo() -actions-> App.js -> Header.js -[as onSave()]-> TodoInput.js (handleKeyDown(e))

    case TOGGLE_TODO <-store- TOGGLE_TODO <-view trigger-
    ---
    toggleTodo(todo) -actions-> App.js -> TodoList.js -> TodoItem.js (onChange event)

    case TOGGLE_ALL_TODOS <-store- TOGGLE_ALL_TODOS <-view trigger-
    ---
    toggleAllTodos() -actions-> App.js -> TodoList.js (toggleAll onChange -> toggleAllTodos() [local])

    case DELETE_TODO <-store- DELETE_TODO <-view trigger-
    ---
    deleteTodo(id) -actions-> App.js -> TodoList.js -> TodoItem.js (destroy button onChange event, or saving an empty todo in handleSave())

    case DELETE_COMPLETED_TODOS <-store- DELETE_COMPLETED_TODOS <-view trigger-
    ---
    deleteCompletedTodos() -actions-> App.js -> Footer.js (onClick if the clear all button is rendered)

    case EDIT_TODO <-store- EDIT_TODO <-view trigger-
    ---
    editTodo() -actions-> App.js -> ItemList.js -> TodoItem.js -[as onSave()]-> TodoInput.js (handleKeyDown(e))

# TODO: Directory structure (wait for redux 1.0)

/ components
  / routes.js
  / App
     /  index.js -> Container

# Server Side

http://docs.sequelizejs.com/en/latest/docs/getting-started/

## Setup

```sh
brew update && brew install postgresql
ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
# Then create database user & db
createuser -d username -W
createdb database -U username
```

## Dependencies

```sh
npm install --save sequelize
npm install --save pg pg-hstore
```
