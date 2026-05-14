import { FiEdit2, FiTrash2, FiCalendar } from 'react-icons/fi';

const TaskCard = ({ task, onEdit, onDelete }) => {
  // Format Date safely
  let formattedDate = 'Invalid Date';
  let isOverdue = false;

  if (task.dueDate) {
    const dateObj = new Date(task.dueDate);
    if (!isNaN(dateObj.getTime())) {
      formattedDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      // Check if overdue
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (dateObj < today && task.status !== 'Completed') {
        isOverdue = true;
      }
    }
  }

  return (
    <div className="task-card">
      <div className="task-header">
        <h3 className="task-title">{task.title}</h3>
      </div>
      
      <p className="task-desc">{task.description}</p>
      
      <div className="task-meta">
        <div className="meta-item">
          <FiCalendar />
          <span>{formattedDate}</span>
        </div>
        
        <div className="badges">
          <span className={`badge status-${task.status.toLowerCase().replace(' ', '-')}`}>
            {task.status}
          </span>
          <span className={`badge priority-${task.priority.toLowerCase()}`}>
            {task.priority} Priority
          </span>
          {isOverdue && (
            <span className="badge overdue-badge">Overdue</span>
          )}
        </div>
      </div>
      
      <div className="task-actions">
        <button 
          className="action-btn edit-btn" 
          onClick={() => onEdit(task)}
          title="Edit Task"
        >
          <FiEdit2 />
        </button>
        <button 
          className="action-btn delete-btn" 
          onClick={() => onDelete(task._id)}
          title="Delete Task"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
