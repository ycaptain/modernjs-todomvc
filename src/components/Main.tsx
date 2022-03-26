import React from 'react';
import { TodoItem } from '../models/todoModel';
import { Todo } from './Todo';

interface Props {
  todos: Array<TodoItem>;
  editing: string;
  onToggle: (todo: TodoItem) => void;
  onToggleAll: (checked: boolean) => void;
  onEdit: (todo: TodoItem) => void;
  onSave: (v: TodoItem, val: string) => void;
  onCancel: () => void;
  onDestroy: (todo: TodoItem) => void;
}

export function Main(props: Props) {
  const {
    todos,
    editing,
    onToggle,
    onToggleAll,
    onEdit,
    onSave,
    onCancel,
    onDestroy,
  } = props;

  const activeTodoCount = todos.reduce(function (accum, todo) {
    return todo.completed ? accum : accum + 1;
  }, 0);

  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={activeTodoCount === 0}
        onChange={event => onToggleAll((event.target as any).checked)}
      />
      <label htmlFor="toggle-all"></label>
      <ul className="todo-list">
        {todos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            editing={editing === todo.id}
            onCancel={onCancel}
            onDestroy={() => onDestroy(todo)}
            onEdit={() => onEdit(todo)}
            onSave={(v: string) => onSave(todo, v)}
            onToggle={() => onToggle(todo)}
          />
        ))}
      </ul>
    </section>
  );
}
