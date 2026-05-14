import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getTasks, getStats, createTask, updateTask, deleteTask } from './services/api';

// Components
import Navbar from './components/Navbar';

// Pages
import Dashboard from './pages/Dashboard';
import TaskFormPage from './pages/TaskFormPage';
import Analytics from './pages/Analytics';

function App() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0, overdue: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search and Filter State
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  
  // Edit State
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    fetchData();
  }, [search, statusFilter, priorityFilter]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (search) params.search = search;
      if (statusFilter !== 'All') params.status = statusFilter;
      if (priorityFilter !== 'All') params.priority = priorityFilter;

      const [tasksRes, statsRes] = await Promise.all([
        getTasks(params),
        getStats()
      ]);
      
      setTasks(tasksRes.data);
      setStats(statsRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    await createTask(taskData);
    fetchData();
  };

  const handleUpdateTask = async (taskData) => {
    await updateTask(taskToEdit._id, taskData);
    setTaskToEdit(null);
    fetchData();
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Delete this task?')) {
      await deleteTask(id);
      fetchData();
    }
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <Dashboard 
                stats={stats}
                tasks={tasks}
                loading={loading}
                error={error}
                search={search}
                setSearch={setSearch}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
                onEdit={(task) => setTaskToEdit(task)}
                onDelete={handleDeleteTask}
              />
            } />
            <Route path="/add" element={
              <TaskFormPage 
                onSubmit={taskToEdit ? handleUpdateTask : handleCreateTask}
                taskToEdit={taskToEdit}
                onCancel={() => setTaskToEdit(null)}
              />
            } />
            <Route path="/analytics" element={
              <Analytics stats={stats} />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
