# Student Task Tracker

A complete MERN stack application built to manage daily internship and study tasks efficiently. This application features a clean, responsive UI with smooth animations, advanced filtering, and backend data validation.

## Features

- **Interactive Kanban Board**: Visual 3-column drag-and-drop style layout (Pending, In Progress, Completed) to seamlessly track task stages.
- **Dynamic Progress Bar**: A sleek, animated progress bar that automatically calculates the percentage of total tasks completed.
- **Advanced Filtering & Search**: Search by title/description and filter by status and priority.
- **Task Statistics**: Real-time dashboard showing Total, Pending, Completed, and Overdue tasks.
- **Overdue Task Detection**: Automatically calculates and highlights tasks that have passed their due date and are not yet completed.
- **Frontend & Backend Validation**: Ensures data integrity with comprehensive validation.
- **Responsive UI**: Works seamlessly on desktop, tablet, and mobile devices.

## Tech Stack

- **Database**: MongoDB Atlas
- **Backend**: Node.js, Express.js, Mongoose
- **Frontend**: React.js (Vite), Axios, Plain Modern CSS

## Folder Structure

```
student-task-tracker/
│
├── client/                 # React Frontend (Vite)
│   ├── public/             # Static assets
│   ├── src/                
│   │   ├── components/     # Reusable React components (TaskForm, TaskList, etc.)
│   │   ├── services/       # API integration using Axios
│   │   ├── App.jsx         # Main application component & State Management
│   │   ├── main.jsx        # React entry point
│   │   └── index.css       # Global styles & responsive design
│   ├── package.json        
│   └── .env.example        
│
├── server/                 # Node.js + Express Backend
│   ├── config/             # Database connection configuration
│   ├── controllers/        # Business logic for routes
│   ├── middleware/         # Custom Express middlewares (Error Handling)
│   ├── models/             # Mongoose schemas (Task Model)
│   ├── routes/             # API route definitions
│   ├── server.js           # Express application entry point
│   ├── package.json        
│   └── .env.example        
│
├── README.md               
└── .gitignore              
```

## Environment Variables

To run this project, you will need to add environment variables. Copy the `.env.example` files to `.env` in both `server` and `client` directories.

### Backend (`server/.env`)
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

## Setup Instructions

Follow these steps to run the application locally from a fresh clone.

### 1. Clone the repository
```bash
git clone <repo-url>
cd student-task-tracker
```

### 2. Backend Setup
```bash
cd server
npm install
# Create the .env file as instructed above with your MongoDB connection string
npm run dev
```
The server will start on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal window:
```bash
cd client
npm install
# Create the .env file if your backend is running on a different port
npm run dev
```
The React app will start on `http://localhost:5173`.

## API Endpoints

| Method | Endpoint             | Description                                      |
|--------|----------------------|--------------------------------------------------|
| GET    | `/api/tasks`         | Get all tasks (Supports `search`, `status`, `priority` queries) |
| POST   | `/api/tasks`         | Create a new task                                |
| PUT    | `/api/tasks/:id`     | Update an existing task                          |
| DELETE | `/api/tasks/:id`     | Delete a task                                    |
| GET    | `/api/tasks/stats`   | Get task statistics (Total, Pending, Completed, Overdue) |

## Screenshots

> *Add your screenshots here before submission.*
> 
> - **Dashboard/Counts Screenshot**
>   ![Dashboard Placeholder](#)
> - **Task List Screenshot**
>   ![Task List Placeholder](#)
> - **Add/Edit Form Screenshot**
>   ![Form Placeholder](#)

## AI Usage

AI tools were used for guidance in planning the folder structure, improving UI design ideas, setting up robust validation logic, and formatting this README. The code was thoroughly reviewed, understood, and tested before submission to ensure all requirements were met.

## Review Explanation

- **Folder Structure**: Separated into `client` and `server` for clear distinction between the React frontend and Node.js backend. The backend uses an MVC-like pattern (Models, Controllers, Routes) for maintainability.
- **Database Design**: A single `Task` Mongoose schema is used. It enforces data types, required fields, and specific enums for `status` and `priority` to prevent invalid data entry.
- **API Flow**: 
  1. The client makes HTTP requests via Axios to the Express routes.
  2. Routes forward the request to the specific Controller.
  3. The Controller interacts with MongoDB via Mongoose.
  4. The Controller sends a JSON response back to the client.
- **React Components**: The UI is broken down into logical pieces (`TaskForm`, `TaskList`, `TaskCard`, `TaskStats`). The `TaskList` acts as a dynamic **Kanban Board**, automatically categorizing tasks into visual columns based on their state. `App.jsx` handles the global state and passes data down as props.
- **Validation Logic**: 
  - *Frontend*: Prevents form submission if fields are empty or invalid, providing immediate feedback.
  - *Backend*: Mongoose schema validation ensures no invalid data can reach the database. A custom `errorHandler` middleware formats these errors cleanly for the frontend.
- **Overdue Logic**: Calculated dynamically on the backend by comparing the `dueDate` with the current date, ensuring tasks that are past due and not marked as "Completed" are flagged correctly.
