import { FiList, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const TaskStats = ({ stats }) => {
  const progressPercentage = stats?.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  return (
    <div className="stats-section">
      {/* Progress Bar */}
      <div className="progress-container fade-in">
        <div className="progress-header">
          <h3>Overall Progress</h3>
          <span className="progress-text">{progressPercentage}% Completed</span>
        </div>
        <div className="progress-bar-bg">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="stats-container">
        <div className="stat-card total">
          <div className="stat-icon">
            <FiList />
          </div>
          <div className="stat-info">
            <h3>Total Tasks</h3>
            <p>{stats?.total || 0}</p>
          </div>
        </div>
        
        <div className="stat-card pending">
          <div className="stat-icon">
            <FiClock />
          </div>
          <div className="stat-info">
            <h3>Pending</h3>
            <p>{stats?.pending || 0}</p>
          </div>
        </div>
        
        <div className="stat-card completed">
          <div className="stat-icon">
            <FiCheckCircle />
          </div>
          <div className="stat-info">
            <h3>Completed</h3>
            <p>{stats?.completed || 0}</p>
          </div>
        </div>
        
        <div className="stat-card overdue">
          <div className="stat-icon">
            <FiAlertCircle />
          </div>
          <div className="stat-info">
            <h3>Overdue</h3>
            <p>{stats?.overdue || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;
