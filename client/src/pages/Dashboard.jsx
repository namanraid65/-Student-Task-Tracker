import TaskStats from '../components/TaskStats';
import SearchFilter from '../components/SearchFilter';
import TaskList from '../components/TaskList';
import Loader from '../components/Loader';

const Dashboard = ({ 
  stats, 
  tasks, 
  loading, 
  error, 
  search, 
  setSearch, 
  statusFilter, 
  setStatusFilter, 
  priorityFilter, 
  setPriorityFilter,
  onEdit,
  onDelete 
}) => {
  return (
    <div className="page-content fade-in">
      <header className="page-header">
        <h1>My Dashboard</h1>
        <p>Monitor your progress and manage your tasks</p>
      </header>

      <TaskStats stats={stats} />

      <SearchFilter 
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <Loader />
      ) : (
        <TaskList 
          tasks={tasks} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      )}
    </div>
  );
};

export default Dashboard;
