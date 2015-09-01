import React, { Component, PropTypes } from 'react';
import TodoInput from './TodoInput';
import classnames from 'classnames';

export default class TodoItem extends Component {

  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    };
  }

  handleDoubleClick() {
    this.setState({ editing: true });
  }


  handleSave(id, text) {
    if (text.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo(id, text);
    }
    this.setState({ editing: false });
  }

  render() {
    const {todo, toggleTodo, deleteTodo} = this.props;
    let element;

    if (this.state.editing) {
      element = (
        <TodoInput text={todo.text}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(todo.id, text)} />
      );
    } else {
      element = (
        <div className='view'>
          <label onDoubleClick={this.handleDoubleClick.bind(this)}>
            {todo.text}
          </label>
          <input className='toggle'
                 type='checkbox'
                 checked={todo.complete}
                 onChange={() => toggleTodo(todo)} />
          <button className='destroy'
                  onClick={() => deleteTodo(todo)} />
        </div>
      );
    }

    return (
      <li className={classnames({
        completed: todo.complete,
        editing: this.state.editing
      })}>
        {element}
      </li>
    )
  }
}