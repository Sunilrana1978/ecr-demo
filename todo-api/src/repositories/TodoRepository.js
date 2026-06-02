import { BaseRepository } from '@shared/repositories';
import { Todo } from '../models/Todo.js';

export class TodoRepository extends BaseRepository {
  constructor() {
    super(Todo);
  }
}

