import path from 'path';

module.exports = {
  'config': path.resolve(__dirname, 'sequelize.config.ts'),
  'models-path': path.resolve(__dirname, 'src/models'),
  'migrations-path': path.resolve(__dirname, 'migrations'),
  'seeders-path': path.resolve(__dirname, 'seeders')
};