import dotenv from 'dotenv';
import initialiseDatabase from '../db/db.connect.js';
import User from '../models/User.js';
import Project from '../models/Project.js';
import Assignment from '../models/Assignment.js';
import bcrypt from 'bcrypt';

dotenv.config();
await initialiseDatabase();

console.log('🌱 Seeding database...');

//Optional: clear existing data if needed
// await Assignment.deleteMany();
// await Project.deleteMany();
// await User.deleteMany();

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const users = await Promise.all([
  {
    name: 'Emma Johnson',
    email: 'emma.johnson@techhub.dev',
    password: await hashPassword('password123'),
    role: 'engineer',
    skills: ['React', 'TypeScript', 'Tailwind'],
    seniority: 'mid',
    maxCapacity: 100,
    department: 'Frontend',
  },
  {
    name: 'Liam Smith',
    email: 'liam.smith@techhub.dev',
    password: await hashPassword('securepass456'),
    role: 'engineer',
    skills: ['Node.js', 'Express', 'MongoDB'],
    seniority: 'senior',
    maxCapacity: 50,
    department: 'Backend',
  },
  {
    name: 'Olivia Brown',
    email: 'olivia.brown@techhub.dev',
    password: await hashPassword('devpass789'),
    role: 'engineer',
    skills: ['Python', 'Django', 'PostgreSQL'],
    seniority: 'junior',
    maxCapacity: 100,
    department: 'Backend',
  },
  {
    name: 'Noah Wilson',
    email: 'noah.wilson@techhub.dev',
    password: await hashPassword('passnoah2024'),
    role: 'engineer',
    skills: ['Java', 'Spring', 'MySQL'],
    seniority: 'senior',
    maxCapacity: 75,
    department: 'Backend',
  },
  {
    name: 'William Turner',
    email: 'william.turner@techhub.dev',
    password: await hashPassword('managerpass321'),
    role: 'manager',
  },
]);

const savedUsers = await User.insertMany(users);

const projects = await Project.insertMany([
  {
    name: 'Client Dashboard',
    description: 'Frontend dashboard for client analytics.',
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 2)),
    requiredSkills: ['React', 'Tailwind'],
    teamSize: 2,
    status: 'active',
    managerId: savedUsers.find(u => u.role === 'manager')._id,
  },
  {
    name: 'API Gateway Refactor',
    description: 'Refactoring microservice gateway in Node.js',
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    requiredSkills: ['Node.js', 'Express'],
    teamSize: 1,
    status: 'planning',
    managerId: savedUsers.find(u => u.role === 'manager')._id,
  },
  {
    name: 'Mobile App Backend',
    description: 'Build REST API for mobile app users',
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    requiredSkills: ['Java', 'Spring', 'MySQL'],
    teamSize: 2,
    status: 'active',
    managerId: savedUsers.find(u => u.role === 'manager')._id,
  },
  {
    name: 'Data Analytics Pipeline',
    description: 'Pipeline for processing and visualizing data',
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 4)),
    requiredSkills: ['Python', 'Django', 'PostgreSQL'],
    teamSize: 1,
    status: 'active',
    managerId: savedUsers.find(u => u.role === 'manager')._id,
  },
]);

const savedProjects = projects; // for clarity

await Assignment.create([
  // Emma - Frontend Dev part-time 50%
  {
    engineerId: savedUsers.find(u => u.email === 'emma.johnson@techhub.dev')._id,
    projectId: savedProjects.find(p => p.name === 'Client Dashboard')._id,
    allocationPercentage: 50,
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 2)),
    role: 'Frontend Developer',
  },
  // Liam - Backend Engineer full-time 100%
  {
    engineerId: savedUsers.find(u => u.email === 'liam.smith@techhub.dev')._id,
    projectId: savedProjects.find(p => p.name === 'API Gateway Refactor')._id,
    allocationPercentage: 100,
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    role: 'Backend Engineer',
  },
  // Olivia - Junior Dev full-time 100%
  {
    engineerId: savedUsers.find(u => u.email === 'olivia.brown@techhub.dev')._id,
    projectId: savedProjects.find(p => p.name === 'Data Analytics Pipeline')._id,
    allocationPercentage: 100,
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 4)),
    role: 'Junior Developer',
  },
  // Noah - Senior Backend half-time 50%
  {
    engineerId: savedUsers.find(u => u.email === 'noah.wilson@techhub.dev')._id,
    projectId: savedProjects.find(p => p.name === 'Mobile App Backend')._id,
    allocationPercentage: 50,
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    role: 'Senior Backend Engineer',
  },
  // Emma - Frontend Developer on Mobile App Backend part-time 30%
  {
    engineerId: savedUsers.find(u => u.email === 'emma.johnson@techhub.dev')._id,
    projectId: savedProjects.find(p => p.name === 'Mobile App Backend')._id,
    allocationPercentage: 30,
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
    role: 'Frontend Developer',
  },
  // Liam - Backend support on Data Analytics Pipeline part-time 20%
  {
    engineerId: savedUsers.find(u => u.email === 'liam.smith@techhub.dev')._id,
    projectId: savedProjects.find(p => p.name === 'Data Analytics Pipeline')._id,
    allocationPercentage: 20,
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 4)),
    role: 'Backend Support Engineer',
  },
  // Noah - Java dev on API Gateway Refactor part-time 30%
  {
    engineerId: savedUsers.find(u => u.email === 'noah.wilson@techhub.dev')._id,
    projectId: savedProjects.find(p => p.name === 'API Gateway Refactor')._id,
    allocationPercentage: 30,
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    role: 'Java Developer',
  },
  // Olivia - Junior dev on Client Dashboard part-time 20%
  {
    engineerId: savedUsers.find(u => u.email === 'olivia.brown@techhub.dev')._id,
    projectId: savedProjects.find(p => p.name === 'Client Dashboard')._id,
    allocationPercentage: 20,
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 2)),
    role: 'Junior Developer',
  },
]);

console.log('✅ Database seeded with expanded users, projects, and assignments');
process.exit();
