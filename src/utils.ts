import { nanoid } from 'nanoid';
import { TodoItem } from './models/todoModel';

// 生成唯一 id
export function generateId() {
  return nanoid();
}
// 从 localStorage 获取或向 localStorage 同步数据
export function store(namespace: string, data?: Array<TodoItem>) {
  if (data) {
    return localStorage.setItem(namespace, JSON.stringify(data));
  }

  const localStore = localStorage.getItem(namespace);
  return (localStore && JSON.parse(localStore)) || [];
}

export function pluralize(count: number, word: string) {
  return count === 1 ? word : `${word}s`;
}
