import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

export default class TodoInput extends Component {

  static propTypes = {
    text: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    editing: PropTypes.bool,
    newTodo: PropTypes.bool
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      text: this.props.text || ''
    };
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleBlur(e) {
    if (!this.props.newTodo) {
      this.props.onSave(e.target.value);
    }
  }

  handleKeyDown(e) {
    const text = e.target.value.trim();
    if (e.keyCode === 13) {
      this.props.onSave(text);
      if (this.props.newTodo) {
        this.setState({ text: '' });
      }
    }
  }

  render() {

    return (
      <input type="text" autoFocus="true"
            className={classnames({
              edit: this.props.editing,
              'new-todo': this.props.newTodo
            })}
            value={this.state.text}
            placeholder={this.props.placeholder}
            onKeyDown={this.handleKeyDown.bind(this)}
            onBlur={this.handleBlur.bind(this)}
            onChange={this.handleChange.bind(this)}>
      </input>
    );
  }
}
