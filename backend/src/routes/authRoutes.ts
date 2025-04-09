import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { IUser } from '../models/User';
import { config } from 'dotenv';

config();

const router = express.Router();

// Register a new user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user: IUser = new User({ username, email, password });
    await user.save();
    res.status(201).send({ message: 'User created successfully' });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

// Login user
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', {
      expiresIn: '1h',
    });

    res.send({ token });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
});

// Get current user
router.get('/profile', (req: Request, res: Response) => {
  res.json({ message: 'Get user profile endpoint' });
});

export default router;
