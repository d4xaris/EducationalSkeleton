class Task {
  constructor({ id, title, description = '', status = 'pending', createdAt = new Date().toISOString() }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status; // pending | in-progress | done
    this.createdAt = createdAt;
  }
}

module.exports = Task;
