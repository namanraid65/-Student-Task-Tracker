import TaskCard from './TaskCard';
import { FiInbox } from 'react-icons/fi';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="empty-state fade-in">
        <FiInbox className="empty-icon" />
        <h3>No tasks found</h3>
        <p>You don't have any tasks matching your criteria.</p>
      </div>
    );
  }

  const pendingTasks = tasks.filter(task => task.status === 'Pending');
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress');
  const completedTasks = tasks.filter(task => task.status === 'Completed');

  return (
    <div className="kanban-board">
      {/* Pending Column */}
      <div className="kanban-column">
        <div className="column-header pending-header">
          <h3>Pending</h3>
          <span className="task-count">{pendingTasks.length}</span>
        </div>
        <div className="column-content">
          {pendingTasks.map((task) => (
            <div key={task._id} className="fade-in">
              <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} />
            </div>
          ))}
          {pendingTasks.length === 0 && <div className="empty-column">No pending tasks</div>}
        </div>
      </div>

      {/* In Progress Column */}
      <div className="kanban-column">
        <div className="column-header progress-header">
          <h3>In Progress</h3>
          <span className="task-count">{inProgressTasks.length}</span>
        </div>
        <div className="column-content">
          {inProgressTasks.map((task) => (
            <div key={task._id} className="fade-in">
              <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} />
            </div>
          ))}
          {inProgressTasks.length === 0 && <div className="empty-column">No tasks in progress</div>}
        </div>
      </div>

      {/* Completed Column */}
      <div className="kanban-column">
        <div className="column-header completed-header">
          <h3>Completed</h3>
          <span className="task-count">{completedTasks.length}</span>
        </div>
        <div className="column-content">
          {completedTasks.map((task) => (
            <div key={task._id} className="fade-in">
              <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} />
            </div>
          ))}
          {completedTasks.length === 0 && <div className="empty-column">No completed tasks</div>}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
