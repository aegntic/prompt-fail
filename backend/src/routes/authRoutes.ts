import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { UserAttributes } from '../models/User';
import { config } from 'dotenv';

config();

const router = express.Router();

// Register a new user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
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
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }
    const isMatch = user ? await user.comparePassword(password) : false;
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user!.id }, process.env.JWT_SECRET || 'your_jwt_secret', {
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
