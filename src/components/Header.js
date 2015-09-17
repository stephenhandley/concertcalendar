import React, { PropTypes, Component } from 'react';
import TodoInput from './TodoInput';

export default class Header extends Component {

  static propTypes = {
    placeholder: PropTypes.string,
    createTodo: PropTypes.func.isRequired,
  }

  render() {

    return (
      <header className='header'>
        <h1>todos</h1>
        <TodoInput placeholder={this.props.placeholder}
          onSave={this.props.createTodo}
          newTodo={true}
        />
      </header>
    );
  }
}
