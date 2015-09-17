import React, { PropTypes, Component } from 'react';
import TodoItem from './TodoItem';


export default class TodosList extends Component {
    static propTypes = {
      todos: PropTypes.array.isRequired,
      markAllTodosAsComplete: PropTypes.func.isRequired,
      markTodoAsComplete: PropTypes.func.isRequired,
      editTodo: PropTypes.func.isRequired,
      deleteTodo: PropTypes.func.isRequired
    }

    markTodoAsComplete(todo) {
        this.props.markTodoAsComplete(todo.id);
    }

    deleteTodo(todo) {
        this.props.deleteTodo(todo.id);
    }

    markAllTodosAsComplete() {
        this.props.markAllTodosAsComplete();
    }

    renderMarkCompleteAll(completeCount) {
        const { todos, actions } = this.props;

        if (todos.length > 0) {

          return (
            <input className='toggle-all'
                   type='checkbox'
                   checked={completeCount === todos.length}
                   onChange={this.markAllTodosAsComplete.bind(this)} />
          );
        }
    }

  render() {
    const { todos } = this.props;
    const completeCount = todos.reduce((count, todo) =>
          todo.complete ? count + 1 : count,
          0
    );

    return (
        <section className='main'>
            {this.renderMarkCompleteAll(completeCount)}
            <ul className="todo-list">
              {this.props.todos.map((todo, index) => <TodoItem
                todo={todo}
                key={todo.id}
                markTodoAsComplete={this.markTodoAsComplete.bind(this, todo)}
                editTodo={this.props.editTodo}
                deleteTodo={this.deleteTodo.bind(this, todo)}
                />)}
            </ul>
        </section>
    )
  }
}
