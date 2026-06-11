import React, { useState } from 'react';

function Tasks() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Sample Task 1', description: 'This is a test task', status: 'To Do' },
    { id: 2, title: 'Sample Task 2', description: 'This is another test task', status: 'In Progress' }
  ]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');

  const handleCreateTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      title,
      description,
      status
    };
    setTasks([...tasks, newTask]);
    setTitle('');
    setDescription('');
    setStatus('To Do');
    console.log('Task created locally:', newTask);
    // API integration will be done here later
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    console.log('Task deleted locally, id:', id);
    // API integration will be done here later
  };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px' }}>
      <h2>My Tasks</h2>

      {/* Create Task Form */}
      <form onSubmit={handleCreateTask} style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <h3>Create New Task</h3>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="title">Title:</label>
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
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="status">Status:</label>
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
        <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
          Add Task
        </button>
      </form>

      {/* Task List */}
      <h3>Task List</h3>
      {tasks.length === 0 ? (
        <p>No tasks found. Create one above!</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {tasks.map(task => (
            <li key={task.id} style={{ padding: '15px', border: '1px solid #eee', marginBottom: '10px', borderRadius: '5px', backgroundColor: '#fafafa' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4>{task.title}</h4>
                <span style={{
                  padding: '3px 8px',
                  borderRadius: '3px',
                  fontSize: '12px',
                  backgroundColor: task.status === 'Completed' ? '#D4EDDA' : task.status === 'In Progress' ? '#FFF3CD' : '#E2E3E5',
                  color: task.status === 'Completed' ? '#155724' : task.status === 'In Progress' ? '#856404' : '#383D41'
                }}>
                  {task.status}
                </span>
              </div>
              <p>{task.description}</p>
              <button
                onClick={() => handleDeleteTask(task.id)}
                style={{ padding: '5px 10px', backgroundColor: '#DC3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '12px' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tasks;
