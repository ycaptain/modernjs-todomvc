import { generateId, store } from '../utils';

export class TodoModel {
  // 成员变量类型定义
  key: string;

  todos: Array<TodoItem>;

  onChanges: Array<Subscriber>;

  // 初始化 todos, 通过 key 从 store 中读取历史缓存
  constructor(key: string) {
    this.key = key;
    this.todos = store(key);
    this.onChanges = [];
  }

  // 添加监听器
  subscribe(onChange: Subscriber) {
    this.onChanges.push(onChange);
  }

  // 触发监听器，并更新 store
  inform() {
    store(this.key, this.todos);
    this.onChanges.forEach(function (cb) {
      cb();
    });
  }

  // 添加 todo
  addTodo(title: string) {
    this.todos = this.todos.concat({
      id: generateId(),
      title,
      completed: false,
    });

    this.inform();
  }

  // 切换所有 todo 到 完成/未完成 状态
  toggleAll(checked: boolean) {
    this.todos = this.todos.map(function (todo) {
      return {
        ...todo,
        completed: checked,
      };
    });
    this.inform();
  }

  // 切换特定 todo 状态
  toggle(todoToToggle: TodoItem) {
    this.todos = this.todos.map(function (todo) {
      return todo !== todoToToggle
        ? todo
        : {
            ...todo,
            completed: !todo.completed,
          };
    });

    this.inform();
  }

  // 删除特定 todo
  destroy(todo: TodoItem) {
    this.todos = this.todos.filter(function (candidate) {
      return candidate !== todo;
    });

    this.inform();
  }

  // 修改特定 todo 内容
  save(todoToSave: TodoItem, text: string) {
    this.todos = this.todos.map(function (todo) {
      return todo !== todoToSave
        ? todo
        : {
            ...todo,
            title: text,
          };
    });

    this.inform();
  }

  // 删除所有已完成 todo
  clearCompleted() {
    this.todos = this.todos.filter(function (todo) {
      return !todo.completed;
    });

    this.inform();
  }
}

// 订阅者类型定义
export type Subscriber = () => void;
// 单个 Todo 类型定义
export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}
