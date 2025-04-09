import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import User from './User';

class Prompt extends Model {
  public id!: number;
  public userId!: number;
  public title!: string;
  public description!: string;
  public content!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Prompt.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'prompts',
  }
);

Prompt.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Prompt, { foreignKey: 'userId', as: 'prompts' });

export default Prompt;
