const taskRepository = require('../repositories/TaskRepository');

// Façade Pattern — exposes a simple interface for business logic,
// hiding the details of validation, data access, and error handling.
class TaskService {
  getAllTasks() {
    return taskRepository.findAll();
  }

  getTaskById(id) {
    const task = taskRepository.findById(id);
    if (!task) throw new Error(`Task with id "${id}" not found`);
    return task;
  }

  createTask({ title, description, status }) {
    if (!title || title.trim() === '') throw new Error('Title is required');
    const validStatuses = ['pending', 'in-progress', 'done'];
    if (status && !validStatuses.includes(status)) {
      throw new Error(`Invalid status. Allowed: ${validStatuses.join(', ')}`);
    }
    return taskRepository.create({ title: title.trim(), description, status });
  }

  updateTask(id, data) {
    this.getTaskById(id); // throws if not found
    if (data.status) {
      const validStatuses = ['pending', 'in-progress', 'done'];
      if (!validStatuses.includes(data.status)) {
        throw new Error(`Invalid status. Allowed: ${validStatuses.join(', ')}`);
      }
    }
    return taskRepository.update(id, data);
  }

  deleteTask(id) {
    this.getTaskById(id); // throws if not found
    return taskRepository.delete(id);
  }

  getTasksByStatus(status) {
    return taskRepository.findAll().filter(t => t.status === status);
  }
}

module.exports = new TaskService();
