import dotenv from 'dotenv';

dotenv.config();

import connectDb from '../config/db';
import app from '../src/app';

connectDb();

export default app;
