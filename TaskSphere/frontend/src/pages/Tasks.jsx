import React, { useState, useEffect } from 'react';
import { taskService } from '../services/api';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [editingTaskId, setEditingTaskId] = useState(null);
  
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      setErrorMsg('Failed to load tasks from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateOrUpdateTask = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const taskData = { title, description, status };

    try {
      if (editingTaskId) {
        const updatedTask = await taskService.updateTask(editingTaskId, taskData);
        setTasks(tasks.map(t => t.id === editingTaskId ? updatedTask : t));
        setEditingTaskId(null);
      } else {
        const newTask = await taskService.createTask(taskData);
        setTasks([...tasks, newTask]);
      }

      setTitle('');
      setDescription('');
      setStatus('To Do');
    } catch (err) {
      setErrorMsg('Failed to save task.');
    }
  };

  const handleStartEdit = (task) => {
    setEditingTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description || '');
    setStatus(task.status);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setTitle('');
    setDescription('');
    setStatus('To Do');
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    setErrorMsg('');

    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      setErrorMsg('Failed to delete task.');
    }
  };

  const handleStatusChange = async (task, newStatus) => {
    setErrorMsg('');
    const updatedData = {
      title: task.title,
      description: task.description,
      status: newStatus
    };

    try {
      const updatedTask = await taskService.updateTask(task.id, updatedData);
      setTasks(tasks.map(t => t.id === task.id ? updatedTask : t));
    } catch (err) {
      setErrorMsg('Failed to update task status.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>My Tasks</h2>

      {errorMsg && (
        <div style={{ padding: '10px', backgroundColor: '#F8D7DA', color: '#721C24', borderRadius: '3px', marginBottom: '15px' }}>
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleCreateOrUpdateTask} style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#fff' }}>
        <h3>{editingTaskId ? 'Edit Task' : 'Create New Task'}</h3>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '5px' }}>Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', minHeight: '60px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="status" style={{ display: 'block', marginBottom: '5px' }}>Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        
        <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', marginRight: '10px' }}>
          {editingTaskId ? 'Update Task' : 'Add Task'}
        </button>
        {editingTaskId && (
          <button type="button" onClick={handleCancelEdit} style={{ padding: '8px 15px', backgroundColor: '#6C757D', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
            Cancel
          </button>
        )}
      </form>

      <h3>Tasks List</h3>
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found. Add your first task above!</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {tasks.map(task => (
            <li key={task.id} style={{ padding: '15px', border: '1px solid #eee', marginBottom: '10px', borderRadius: '5px', backgroundColor: '#fcfcfc' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <h4 style={{ margin: '0 0 5px 0', fontSize: '18px' }}>{task.title}</h4>
                  <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{task.description}</p>
                </div>
                
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task, e.target.value)}
                  style={{
                    padding: '4px',
                    borderRadius: '3px',
                    backgroundColor: task.status === 'Completed' ? '#D4EDDA' : task.status === 'In Progress' ? '#FFF3CD' : '#E2E3E5',
                    color: task.status === 'Completed' ? '#155724' : task.status === 'In Progress' ? '#856404' : '#383D41',
                    border: '1px solid #ccc',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  onClick={() => handleStartEdit(task)}
                  style={{ padding: '4px 10px', backgroundColor: '#FFC107', color: '#000', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  style={{ padding: '4px 10px', backgroundColor: '#DC3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tasks;
