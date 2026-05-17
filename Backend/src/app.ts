import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';

import connectDb from '../config/db';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express();

// middleware
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})); // Taki frontend aur backend live deployment par baat kar sake
app.use(express.json()); // JSON data parse karne ke liye

app.get('/', (req: Request, res: Response): void => {
  res.send('Server Chal raha hai!');
})

app.use('/api', async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    next();
    return;
  }

  try {
    await connectDb();
    next();
  } catch (error) {
    next(error);
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);





export default app;
