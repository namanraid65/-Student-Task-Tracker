import { FiLayout, FiPlusSquare, FiPieChart, FiCheckCircle } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <FiCheckCircle className="logo-icon" />
          <span>TaskTracker</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            <FiLayout /> Dashboard
          </Link>
          <Link to="/add" className={`nav-link ${location.pathname === '/add' ? 'active' : ''}`}>
            <FiPlusSquare /> Add Task
          </Link>
          <Link to="/analytics" className={`nav-link ${location.pathname === '/analytics' ? 'active' : ''}`}>
            <FiPieChart /> Analytics
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
