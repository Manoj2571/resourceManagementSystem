# 🛠️ Engineering Resource Management System

A full-stack application to manage engineering team assignments, project planning, and resource utilization. Built for managers to assign engineers efficiently and for engineers to track their workloads.

---


## 🔗 Demo Link

[Live Demo](https://resource-management-system-rms.vercel.app/)


## Login

> **Manager**  
> Username: `william.turner@techhub.dev`  
> Password: `managerpass321`

> **Engineer**  
> Username: `emma.johnson@techhub.dev`  
> Password: `password123`


## Quick Start

```
git clone https://github.com/Manoj2571/resourceManagementSystem.git
cd resourceManagementSystem

# Install server and client dependencies
cd frontend && npm install
cd ../backend && npm install

# Start the server
cd frontend && node index.js

# Start the client
cd client && npm start
```
## Technologies

**🖥 Frontend**
- **React + JavaScript**
- **ShadCN UI** + **Tailwind CSS**
- **React Hook Form** for forms
- **React Router DOM** for routing
- **Recharts** for visual analytics
- **React Context API** for global state

**🌐 Backend**
- **Node.js** with **Express**
- **MongoDB** with Mongoose
- **JWT Authentication**
- RESTful API design

---


### 🚀 Features

**✅ Authentication & User Roles**
- Login with JWT and role-based access (Manager & Engineer)
- Engineers can view assignments
- Managers can manage engineers, projects, and assignments

**🧑‍💻 Engineer Management**
- View engineer profiles with skills, seniority, capacity
- Real-time capacity calculation
- Visual progress bar for workload allocation

**📁 Project Management**
- Add projects with skills required, status, team size
- Track project progress (Planning, Active, Completed)

**🔁 Assignment System**
- Assign engineers to projects with allocation %
- View current & upcoming assignments
- Capacity tracking with visual indicators

**📊 Dashboards**
- Manager dashboard: Team overview & utilization
- Engineer dashboard: My projects, timelines
- Reports: Bar charts showing utilization

**🔍 Search & Filter**
- Filter engineers by skills

**📈 Analytics**
- Team utilization bar chart using Recharts
- Available vs Allocated capacity per engineer

## API Reference

**Auth**
- `POST /api/auth/login`
- `GET /api/auth/profile`

**Engineers**
- `GET /api/engineers`
- `GET /api/engineers/:id/capacity`

**Projects**
- `GET /api/projects`
- `POST /api/projects`

**Assignments**
- `GET /api/assignments`
- `POST /api/assignments`
- `PUT /api/assignments/:id`
- `DELETE /api/assignments/:id`

### AI Usage
**Tools Used**
- ChatGPT (OpenAI) for code scaffolding, refactoring, and architecture decisions
- stitch (Google) for UI Design

**Examples**
- Used ChatGPT to scaffold the assignment model and REST API endpoints
- Used AI to build utility functions like getAvailableCapacity and findSuitableEngineers
- Used AI to optimize form validation logic and reduce redundant code

**Challenges**
- AI sometimes returned incorrect assumptions (e.g., old shadcn, Form syntax)
- Solved by cross-checking with official docs

**Validation Approach**
Fully reviewed and modified all AI-generated code
Manually tested all components and API endpoints

## Contact
For bugs or feature requests, please reach out to manojreddy2571@gmail.com
