import dotenv from 'dotenv';
dotenv.config();

import dns from 'node:dns/promises';

// Only run the DNS override on your local computer during development
if (process.env.NODE_ENV !== 'production') {
  dns.setServers(["1.1.1.1", "8.8.8.8"]);
}



import connectDb from './config/db';
import app from './src/app';

// connect to database
connectDb();



const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})