import request from 'supertest';
import express from 'express';
import authRoutes from '../authRoutes';
import User from '../../models/User';
import jwt from 'jsonwebtoken';

// Mock the User model and jwt
jest.mock('../../models/User');
jest.mock('jsonwebtoken');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('Auth Routes', () => {
  beforeEach(() => {
    // Clear mock calls before each test
    jest.clearAllMocks();
  });

  describe('POST /auth/register', () => {
    it('should return 201 if user registration is successful', async () => {
      const mockUserSave = jest.fn().mockResolvedValue({});
      (User as unknown as jest.Mock).mockImplementation(() => ({
        save: mockUserSave,
      }));

      const newUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      const res = await request(app)
        .post('/auth/register')
        .send(newUser);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('message', 'User created successfully');
      expect(User).toHaveBeenCalledWith(newUser);
      expect(mockUserSave).toHaveBeenCalled();
    });

    it('should return 400 if username is missing', async () => {
      const newUser = {
        email: 'test@example.com',
        password: 'password123',
      };

      const res = await request(app)
        .post('/auth/register')
        .send(newUser);

      expect(res.status).toBe(400);
      // Expect a specific error message or check for a message property
      expect(res.body).toHaveProperty('message');
    });

    it('should return 400 if email is missing', async () => {
      const newUser = {
        username: 'testuser',
        password: 'password123',
      };

      const res = await request(app)
        .post('/auth/register')
        .send(newUser);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message');
    });

    it('should return 400 if password is missing', async () => {
      const newUser = {
        username: 'testuser',
        email: 'test@example.com',
      };

      const res = await request(app)
        .post('/auth/register')
        .send(newUser);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message');
    });

    // TODO: Add tests for invalid email format, password strength, etc.
  });

  describe('POST /auth/login', () => {
    it('should return 200 and a token if login is successful', async () => {
      const mockUser = {
        id: 123,
        email: 'test@example.com',
        comparePassword: jest.fn().mockResolvedValue(true),
      };
      (User.findOne as unknown as jest.Mock).mockResolvedValue(mockUser);
      (jwt.sign as jest.Mock).mockReturnValue('mockToken');

      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      const res = await request(app)
        .post('/auth/login')
        .send(credentials);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token', 'mockToken');
      expect(User.findOne).toHaveBeenCalledWith({ email: credentials.email });
      expect(mockUser.comparePassword).toHaveBeenCalledWith(credentials.password);
      expect(jwt.sign).toHaveBeenCalledWith({ id: mockUser.id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
    });

    it('should return 400 if user is not found', async () => {
      (User.findOne as unknown as jest.Mock).mockResolvedValue(null);

      const credentials = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };

      const res = await request(app)
        .post('/auth/login')
        .send(credentials);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Invalid credentials');
      expect(User.findOne).toHaveBeenCalledWith({ email: credentials.email });
    });

    it('should return 400 if password does not match', async () => {
      const mockUser = {
        id: 123,
        email: 'test@example.com',
        comparePassword: jest.fn().mockResolvedValue(false),
      };
      (User.findOne as unknown as jest.Mock).mockResolvedValue(mockUser);

      const credentials = {
        email: 'test@example.com',
        password: 'wrongpassword',
      };

      const res = await request(app)
        .post('/auth/login')
        .send(credentials);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Invalid credentials');
      expect(User.findOne).toHaveBeenCalledWith({ email: credentials.email });
      expect(mockUser.comparePassword).toHaveBeenCalledWith(credentials.password);
    });

    // TODO: Add tests for missing email or password
  });

  describe('GET /auth/profile', () => {
    it('should return 200 and a message', async () => {
      // This endpoint currently doesn't have auth middleware, so a simple test is sufficient
      const res = await request(app)
        .get('/auth/profile');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'Get user profile endpoint');
    });
    // TODO: Add tests for authenticated access once middleware is implemented/tested
  });
});