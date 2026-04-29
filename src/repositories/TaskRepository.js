const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const Task = require('../models/Task');

const DB_PATH = path.join(__dirname, '../../data/tasks.json');

// Repository Pattern — abstracts all data access behind a uniform interface.
// Switching from JSON file to a real DB requires changes only in this file.
class TaskRepository {
  _read() {
    if (!fs.existsSync(DB_PATH)) return [];
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  }

  _write(tasks) {
    fs.writeFileSync(DB_PATH, JSON.stringify(tasks, null, 2));
  }

  findAll() {
    return this._read().map(t => new Task(t));
  }

  findById(id) {
    const task = this._read().find(t => t.id === id);
    return task ? new Task(task) : null;
  }

  create(data) {
    const tasks = this._read();
    const task = new Task({ ...data, id: uuidv4() });
    tasks.push(task);
    this._write(tasks);
    return task;
  }

  update(id, data) {
    const tasks = this._read();
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return null;
    tasks[idx] = { ...tasks[idx], ...data };
    this._write(tasks);
    return new Task(tasks[idx]);
  }

  delete(id) {
    const tasks = this._read();
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return false;
    tasks.splice(idx, 1);
    this._write(tasks);
    return true;
  }
}

module.exports = new TaskRepository();
