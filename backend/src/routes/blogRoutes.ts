import express, { Request, Response } from 'express';
import { generateBlogPost } from '../controllers/blogController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/generate', generateBlogPost);

// Example of a protected route
router.get('/protected', authMiddleware, (req: Request, res: Response) => {
  res.send('This is a protected route');
});

// Get all blog posts
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'GET all blog posts' });
});

// Get single blog post
router.get('/:id', (req: Request, res: Response) => {
  res.json({ message: `GET blog post with id ${req.params.id}` });
});

// Create blog post
router.post('/', (req: Request, res: Response) => {
  res.json({ message: 'POST a new blog post', data: req.body });
});

// Update blog post
router.put('/:id', (req: Request, res: Response) => {
  res.json({ message: `UPDATE blog post with id ${req.params.id}`, data: req.body });
});

// Delete blog post
router.delete('/:id', (req: Request, res: Response) => {
  res.json({ message: `DELETE blog post with id ${req.params.id}` });
});

export default router;
