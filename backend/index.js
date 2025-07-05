import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import initialiseDatabase from './db/db.connect.js';

import authRoutes from './routes/authRoutes.js';
import engineerRoutes from './routes/engineerRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';

dotenv.config();
initialiseDatabase()

const app = express();

const corsOptions = {
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/engineers', engineerRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/assignments', assignmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
