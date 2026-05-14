import TaskStats from '../components/TaskStats';

const Analytics = ({ stats }) => {
  const completionRate = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  return (
    <div className="page-content fade-in">
      <header className="page-header">
        <h1>Task Analytics</h1>
        <p>Detailed breakdown of your productivity</p>
      </header>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Completion Rate</h3>
          <div className="big-number">{completionRate}%</div>
          <p>Of all tasks have been finished</p>
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h3>Quick Summary</h3>
        <TaskStats stats={stats} />
      </div>
    </div>
  );
};

export default Analytics;
