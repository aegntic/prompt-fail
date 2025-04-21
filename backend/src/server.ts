import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { Sequelize } from 'sequelize'; // Import the Sequelize class constructor
import { sequelize as sequelizeInstance } from './config/database'; // Rename instance import
import userRoutes from './routes/userRoutes';
import promptRoutes from './routes/promptRoutes';
import blogPostRoutes from './routes/blogRoutes';
import commentRoutes from './routes/commentRoutes';
import tagRoutes from './routes/tagRoutes';
import reliabilityRoutes from './routes/reliabilityRoutes';
import { errorHandler } from './middleware/errorHandler';
import { authMiddleware } from './middleware/authMiddleware';
import { Umzug, SequelizeStorage } from 'umzug';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';

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

app.use('/api/reliability', reliabilityRoutes);
// Error handling middleware
app.use(errorHandler);

// Migration setup using Umzug and SequelizeStorage
// This configuration tells Umzug where to find migration files and how to interact with the database.
const umzug = new Umzug({
  migrations: {
    // Glob pattern to find migration files in the 'migrations' directory relative to the current file
    glob: path.join(__dirname, '../migrations/*.js'),
  },
  // Context is used by migrations to interact with the database (e.g., create tables)
  // Pass both queryInterface and the Sequelize class constructor
  context: { queryInterface: sequelizeInstance.getQueryInterface(), Sequelize },
  // SequelizeStorage is used to track which migrations have been applied
  storage: new SequelizeStorage({ sequelize: sequelizeInstance }), // Use renamed instance
  // Logger for outputting migration progress
  logger: console,
});

// Function to run database migrations
// Migrations are run automatically in non-production environments.
// In production, migrations should be run manually using the sequelize-cli.
const runMigrations = async () => {
  // Check if the environment is NOT production
  if (env !== 'production') {
    console.log('Running database migrations...');
    // Apply all pending migrations
    await umzug.up();
    console.log('Database migrations finished.');
  } else {
    // Log instructions for running migrations manually in production
    console.log('Skipping automatic database migrations in production environment.');
    console.log('To run migrations in production, use the sequelize-cli:');
    console.log('npx sequelize-cli db:migrate');
  }
};

// Start the server and connect to the database
const startServer = async () => {
  try {
    // Authenticate connection to the database
    await sequelizeInstance.authenticate(); // Use renamed instance
    console.log('Database connection has been established successfully.');

    // Run database migrations before starting the server
    await runMigrations();

    // Start the Express server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    // Log any errors during database connection or migration
    console.error('Unable to connect to the database or run migrations:', error);
  }
};

startServer();
