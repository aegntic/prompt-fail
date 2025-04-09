import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { sequelize } from './config/database';
import userRoutes from './routes/userRoutes';
import promptRoutes from './routes/promptRoutes';
import blogPostRoutes from './routes/blogPostRoutes';
import commentRoutes from './routes/commentRoutes';
import tagRoutes from './routes/tagRoutes';
import { errorHandler } from './middleware/errorHandler';
import { authMiddleware } from './middleware/authMiddleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

// Middleware
app.use(limiter);
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/prompts', authMiddleware, promptRoutes);
app.use('/api/blogposts', authMiddleware, blogPostRoutes);
app.use('/api/comments', authMiddleware, commentRoutes);
app.use('/api/tags', authMiddleware, tagRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error: any) => {
    console.error('Unable to connect to the database:', error);
  });
