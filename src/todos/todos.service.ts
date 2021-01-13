import { readFileSync, writeFileSync } from 'fs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TodosService {
  findAll() {
    return this.readFileAsJson();
  }

  create(todo: any) {
    const todos = this.readFileAsJson() as any[];
    const newId = this.obtainNewId(todos);
    const updatedTodo = {
      id: newId,
      ...todo,
    };
    const updatedTodos = [...todos, updatedTodo];
    this.writeToFile(updatedTodos);
  }

  updateOne(id: string, partialTodo: any) {
    const todos = this.readFileAsJson() as any[];
    const foundTodoIndex = todos.findIndex((todo) => todo.id === +id);
    if (foundTodoIndex >= 0) {
      const updatedTodo = {
        ...todos[foundTodoIndex],
        ...partialTodo,
      };
      updatedTodo.id = todos[foundTodoIndex].id;
      todos[foundTodoIndex] = updatedTodo;
      this.writeToFile(todos);
    }
  }

  removeOne(id: string) {
    const todos = this.readFileAsJson() as any[];
    const filteredTodos = todos.filter((todo) => todo.id !== +id);
    this.writeToFile(filteredTodos);
  }

  private readFileAsJson(): any {
    try {
      const data = readFileSync('./todos.json', 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  private writeToFile(data: any) {
    const stringified = JSON.stringify(data);
    writeFileSync('./todos.json', stringified);
  }

  private obtainNewId(todos: any[]) {
    if (todos.length > 0) {
      const todoIds = todos.map((todo) => todo.id);
      return Math.max.apply(null, todoIds) + 1;
    } else {
      return 1;
    }
  }
}
