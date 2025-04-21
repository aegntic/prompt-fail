import { Sequelize } from 'sequelize';

// Mock Sequelize instance
const sequelize = {
  define: jest.fn(),
  authenticate: jest.fn().mockResolvedValue(undefined),
  sync: jest.fn().mockResolvedValue(undefined),
  close: jest.fn().mockResolvedValue(undefined),
};

// Mock DataTypes
const DataTypes = {
  INTEGER: 'INTEGER',
  STRING: 'STRING',
  DATE: 'DATE',
  BOOLEAN: 'BOOLEAN',
  TEXT: 'TEXT',
  // Add other DataTypes as needed by your models
};

// Mock Model class
class MockModel {
  static init = jest.fn();
  static associate = jest.fn();
  static findOne = jest.fn();
  static findAll = jest.fn();
  static create = jest.fn();
  static update = jest.fn();
  static destroy = jest.fn();
  // Add other static methods used by your models/routes
}

// Mock User model (assuming it's used directly in routes/controllers)
// You might need to create mocks for other models as well
const User = MockModel;

export { sequelize, DataTypes, MockModel as Model, User };