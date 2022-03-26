import React from 'react';
import cx from 'classnames';
import { pluralize } from '@/utils';

interface Props {
  activeTodoCount: number;
  nowShowing: NowShowing;
  hasCompletedTodos: boolean;
  onClearCompleted: () => void;
}

export type NowShowing = 'all' | 'active' | 'completed';

export function Footer(props: Props) {
  const { activeTodoCount, nowShowing, hasCompletedTodos, onClearCompleted } =
    props;

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeTodoCount}</strong>
        <span> </span>
        <span>{pluralize(activeTodoCount, 'item')}</span>
        <span> left</span>
      </span>
      <ul className="filters">
        <li>
          <a href="#/" className={cx({ selected: nowShowing === 'all' })}>
            All
          </a>
        </li>
        <span> </span>
        <li>
          <a
            href="#/active"
            className={cx({ selected: nowShowing === 'active' })}>
            Active
          </a>
        </li>
        <span> </span>
        <li>
          <a
            href="#/completed"
            className={cx({ selected: nowShowing === 'completed' })}>
            Completed
          </a>
        </li>
      </ul>
      {hasCompletedTodos && (
        <button
          className="clear-completed"
          onClick={onClearCompleted}
          type="button">
          Clear completed
        </button>
      )}
    </footer>
  );
}
