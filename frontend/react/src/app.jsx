import { useState, useEffect } from 'react';
import Task from './components/task';
import Modal from './components/modal';
import * as api from './api/rest';

function App() {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    api.findAllTaks().then((data) => setTasks(data));
  }, []);

  async function onCreate(name) {
    const task = await api.createTask({ name });
    const newTasks = [...tasks, { id: task.id, name: task.name }];
    setTasks(newTasks);
  }

  async function onUpdate(name) {
    await api.updateTaskById(selectedTask.id, { name });
    const newTasks = tasks.map((task) => (task.id === selectedTask.id ? { ...task, name } : task));
    setTasks(newTasks);
    setSelectedTask(null);
  }

  async function onDelete(id) {
    await api.deleteTaskById(id);
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function onSave(name) {
    if (selectedTask) {
      onUpdate(name);
    } else {
      onCreate(name);
    }
  }

  return (
    <>
      <div className="card">
        <div className="header">
          <div className="logo">TODO</div>
          <div className="count">{tasks.length} tasks</div>
        </div>
        <div className="body">
          {tasks.map((task) => (
            <Task
              key={task.id}
              name={task.name}
              onUpdate={() => {
                setSelectedTask(task);
                setOpen(true);
              }}
              onDelete={() => onDelete(task.id)}
            />
          ))}
        </div>
        <button onClick={() => setOpen(true)} className="btn-add">
          Add task
        </button>
      </div>

      <Modal
        defaultName={selectedTask?.name}
        open={open}
        onClose={() => setOpen(false)}
        onSave={onSave}
      />
    </>
  );
}

export default App;
