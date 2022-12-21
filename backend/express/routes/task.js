const { Router, request } = require('express');
const db = require('../db/mysql');
const { Task } = require('../models/task');

const router = Router();

const TABLE_NAME = 'task';

router.get('/', async function (_, res) {
  const rows = await db.findAll(TABLE_NAME);
  const tasks = rows.map((row) => Task.parse(row));

  res.send({
    message: 'get all tasks successfully',
    data: tasks,
  });
});

router.post('/', async function (req, res) {
  const task = new Task(req.body.name);
  const result = await db.create(TABLE_NAME, { name: task.name });
  task.id = result.insertId;

  res.send({
    message: 'create task successfully',
    data: task,
  });
});

router.get('/:id', async function (req, res) {
  const task = new Task();
  task.id = req.params.id;
  const rows = await db.findById(TABLE_NAME, task.id);
  const tasks = rows.map((row) => Task.parse(row));

  if (tasks.length > 0) {
    res.send({
      message: 'get task successfully',
      data: tasks[0],
    });
  }

  res.send({
    message: 'task not found',
  });
});

router.put('/:id', async function (req, res) {
  const task = new Task(req.body.name);
  task.id = req.params.id;
  const result = await db.updateById(TABLE_NAME, task.id, { name: task.name });

  if (result.affectedRows) {
    res.send({
      message: 'update task successfully',
    });
  }

  res.send({
    message: 'task not found',
  });
});

router.delete('/:id', async function (req, res) {
  const task = new Task();
  task.id = req.params.id;
  const result = await db.deleteById(TABLE_NAME, task.id);

  if (result.affectedRows) {
    res.send({
      message: 'delete task successfully',
    });
  }

  res.send({
    message: 'task not found',
  });
});

module.exports = router;
