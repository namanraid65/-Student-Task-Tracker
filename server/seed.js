import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Task from './models/Task.js';

dotenv.config();

const demoTasks = [
  {
    title: 'Complete Mathematics Assignment',
    description: 'Solve exercises from Chapter 4 on Calculus and integration rules.',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    status: 'Pending',
    priority: 'High'
  },
  {
    title: 'Prepare Chemistry Lab Report',
    description: 'Write up observations and conclusions for the acid-base titration experiment.',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Overdue by 1 day
    status: 'Pending',
    priority: 'High'
  },
  {
    title: 'Design Project Presentation',
    description: 'Create slide deck for the group project showcasing the IoT weather station.',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    status: 'In Progress',
    priority: 'Medium'
  },
  {
    title: 'Buy Reference Books',
    description: 'Purchase textbooks for Data Structures and Algorithms from local bookshop.',
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    status: 'Pending',
    priority: 'Low'
  },
  {
    title: 'Submit Physics Worksheet',
    description: 'Complete the questions on electromagnetic waves and submit online.',
    dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // Completed, but past due date
    status: 'Completed',
    priority: 'Medium'
  },
  {
    title: 'Review Lecture Notes',
    description: 'Go through the notes from Monday\'s class on Operating Systems.',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
    status: 'In Progress',
    priority: 'Low'
  },
  {
    title: 'Write Essay on Clean Energy',
    description: 'Write a 1500-word essay discussing the pros and cons of solar vs wind power.',
    dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
    status: 'Pending',
    priority: 'High'
  },
  {
    title: 'Practice Coding Questions',
    description: 'Solve at least 5 LeetCode problems on arrays and hashing algorithms.',
    dueDate: new Date(), // Today
    status: 'In Progress',
    priority: 'High'
  },
  {
    title: 'Submit Internship Certificate',
    description: 'Email the scanned copy of the internship completion letter to the HOD.',
    dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    status: 'Completed',
    priority: 'Medium'
  },
  {
    title: 'Group Study Session',
    description: 'Meet classmates at library to discuss upcoming semester exams preparation.',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    status: 'Pending',
    priority: 'Medium'
  }
];

const seedTasks = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding tasks...');

    await Task.deleteMany();
    console.log('Cleared existing tasks.');

    await Task.insertMany(demoTasks);
    console.log('Successfully inserted 10 demo tasks!');

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding tasks database:', error);
    process.exit(1);
  }
};

seedTasks();
