class Task {
  constructor(name) {
    this.name = name;
  }

  static parse(rawData) {
    const task = new Task();
    task.id = rawData.id;
    task.name = rawData.name;
    task.createdAt = rawData.created_at;
    task.updatedAt = rawData.updated_at;

    return task;
  }
}

module.exports = { Task };
