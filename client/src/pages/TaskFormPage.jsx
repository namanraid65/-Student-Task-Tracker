import TaskForm from '../components/TaskForm';
import { useNavigate } from 'react-router-dom';

const TaskFormPage = ({ onSubmit, taskToEdit, onCancel }) => {
  const navigate = useNavigate();

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    navigate('/'); // Redirect to dashboard after submit
  };

  return (
    <div className="page-content fade-in">
      <header className="page-header">
        <h1>{taskToEdit ? 'Edit Task' : 'Create New Task'}</h1>
        <p>Fill in the details below to organize your work</p>
      </header>
      
      <div className="form-container-page">
        <TaskForm 
          onSubmit={handleFormSubmit} 
          initialData={taskToEdit} 
          onCancel={() => {
            onCancel();
            navigate('/');
          }} 
        />
      </div>
    </div>
  );
};

export default TaskFormPage;
