const taskService = require('../services/TaskService');

// MVC — Controller handles HTTP logic only.
// It delegates all business operations to the Service (Façade).
class TaskController {
  getAll(req, res) {
    const { status } = req.query;
    const tasks = status
      ? taskService.getTasksByStatus(status)
      : taskService.getAllTasks();
    res.json({ success: true, data: tasks });
  }

  getOne(req, res) {
    try {
      const task = taskService.getTaskById(req.params.id);
      res.json({ success: true, data: task });
    } catch (e) {
      res.status(404).json({ success: false, message: e.message });
    }
  }

  create(req, res) {
    try {
      const task = taskService.createTask(req.body);
      res.status(201).json({ success: true, data: task });
    } catch (e) {
      res.status(400).json({ success: false, message: e.message });
    }
  }

  update(req, res) {
    try {
      const task = taskService.updateTask(req.params.id, req.body);
      res.json({ success: true, data: task });
    } catch (e) {
      const code = e.message.includes('not found') ? 404 : 400;
      res.status(code).json({ success: false, message: e.message });
    }
  }

  delete(req, res) {
    try {
      taskService.deleteTask(req.params.id);
      res.json({ success: true, message: 'Task deleted' });
    } catch (e) {
      res.status(404).json({ success: false, message: e.message });
    }
  }
}

module.exports = new TaskController();
