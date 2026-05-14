import { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, initialData, onCancel }) => {
  const formData = {
    title: '',
    description: '',
    dueDate: '',
    status: 'Pending',
    priority: 'Medium',
  };
  
  const [task, setTask] = useState(formData);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      // Format date for input type="date" (YYYY-MM-DD)
      const formattedDate = initialData.dueDate 
        ? new Date(initialData.dueDate).toISOString().split('T')[0]
        : '';
        
      setTask({
        ...initialData,
        dueDate: formattedDate,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Frontend Validation
    if (!task.title.trim() || task.title.trim().length < 3) {
      setError('Title must be at least 3 characters');
      return;
    }
    if (!task.description.trim() || task.description.trim().length < 5) {
      setError('Description must be at least 5 characters');
      return;
    }
    if (!task.dueDate) {
      setError('Due date is required');
      return;
    }

    try {
      await onSubmit(task);
      if (!initialData) {
        setTask({
          title: '',
          description: '',
          dueDate: '',
          status: 'Pending',
          priority: 'Medium',
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="task-form">
      <h2>{initialData ? 'Update Task' : 'Add New Task'}</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group full-width">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g., Complete React UI"
            />
          </div>

          <div className="form-group full-width">
            <label>Description</label>
            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              className="form-control"
              placeholder="Detailed description of the task..."
            ></textarea>
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              className="form-control"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="form-group">
            <label>Priority</label>
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="form-control"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {initialData ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
