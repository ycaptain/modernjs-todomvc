import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import cx from 'classnames';
import { TodoItem } from '../models/todoModel';

interface Props {
  todo: TodoItem;
  editing: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onSave: (v: string) => void;
  onCancel: () => void;
  onDestroy: () => void;
}

const KeyCodes = {
  Enter: 'Enter',
  Escape: 'Escape',
};

export function Todo(props: Props) {
  const { todo, editing, onToggle, onEdit, onSave, onCancel, onDestroy } =
    props;

  const [editText, setEditText] = useState(todo.title);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditText(event.target.value);
  };

  const handleEdit = () => {
    onEdit();
    setEditText(todo.title);
  };

  const handleSubmit = () => {
    const val = editText.trim();

    if (!val) {
      onDestroy();
      return;
    }

    onSave(val);
    setEditText(val);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === KeyCodes.Enter) {
      handleSubmit();
    } else if (event.code === KeyCodes.Escape) {
      onCancel();
      setEditText(todo.title);
    }
  };

  return (
    <li
      className={cx({
        editing,
        completed: todo.completed,
      })}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
        />
        <label onDoubleClick={handleEdit}>{todo.title}</label>
        <button className="destroy" onClick={onDestroy} type="button"></button>
      </div>
      <input
        className="edit"
        value={editText}
        onChange={handleChange}
        onBlur={handleSubmit}
        onKeyDown={handleKeyDown}
      />
    </li>
  );
}
