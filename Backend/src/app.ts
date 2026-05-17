import express, {Request, Response} from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express();

// middleware
app.use(cors()); // Taki frontend (Port 5173) backend (Port 5000) se baat kar sake
app.use(express.json()); // JSON data parse karne ke liye

app.get('/', (req: Request, res: Response): void => {
  res.send('Server Chal raha hai!');
})

app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);





export default app;