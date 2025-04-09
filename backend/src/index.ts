import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import blogRoutes from './routes/blogRoutes';
import authRoutes from './routes/authRoutes'; // Import auth routes
import { config } from 'dotenv';

config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/promptfail')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the promptfail backend!');
});

app.use('/blog', blogRoutes);
app.use('/auth', authRoutes); // Use auth routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
