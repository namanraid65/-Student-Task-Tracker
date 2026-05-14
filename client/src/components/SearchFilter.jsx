import { FiSearch, FiFilter } from 'react-icons/fi';

const SearchFilter = ({ 
  search, 
  setSearch, 
  statusFilter, 
  setStatusFilter, 
  priorityFilter, 
  setPriorityFilter 
}) => {
  
  const handleClear = () => {
    setSearch('');
    setStatusFilter('All');
    setPriorityFilter('All');
  };

  return (
    <div className="search-filter-section">
      <div className="search-box">
        <FiSearch className="search-icon" />
        <input 
          type="text" 
          placeholder="Search tasks by title or description..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      <div className="filter-group">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)'}}>
          <FiFilter />
        </div>
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        
        <select 
          value={priorityFilter} 
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="All">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        
        {(search || statusFilter !== 'All' || priorityFilter !== 'All') && (
          <button className="btn btn-outline" onClick={handleClear}>
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
