import React, { Component, PropTypes } from 'react';
import { VisibilityFilters } from  '../actions/actionTypes';
import classnames from 'classnames';

const {SHOW_ALL, SHOW_INCOMPLETE, SHOW_COMPLETE} = VisibilityFilters;

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_INCOMPLETE]: 'Active',
  [SHOW_COMPLETE]: 'Completed'
};

export default class Footer extends Component {

  static propTypes = {
    incompleteCount: PropTypes.number.isRequired,
    completeCount: PropTypes.number.isRequired,
    filter: PropTypes.string,
    onShow: PropTypes.func.isRequired,
    deleteCompletedTodos: PropTypes.func.isRequired
  }

  renderTodoCount() {
    const { incompleteCount } = this.props;
    const itemWord = incompleteCount === 1 ? 'item' : 'items';

    return (
      <span className="todo-count">
        <strong>{incompleteCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }

  renderFilterLink(filter) {
    const title = FILTER_TITLES[filter];
    const { filter: selectedFilter, onShow } = this.props;

    return (
      <a className={classnames({ selected: filter === selectedFilter })}
         style={{ cursor: 'hand' }}
         onClick={() => onShow(filter)}>
        {title}
      </a>
    );
  }

  renderClearButton() {
    const { completeCount, deleteCompletedTodos } = this.props;
    if (completeCount > 0) {
      return (
        <button className="clear-completed"
                onClick={deleteCompletedTodos} >
          Clear completed
        </button>
      );
    }
  }

  render() {
    return (
      <footer className="footer">
        {this.renderTodoCount()}
        <ul className="filters">
          {[SHOW_ALL, SHOW_COMPLETE, SHOW_INCOMPLETE].map(filter =>
            <li key={filter}>
              {this.renderFilterLink(filter)}
            </li>
          )}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }

}
