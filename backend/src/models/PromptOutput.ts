import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import Prompt from './Prompt';

class PromptOutput extends Model {
  public id!: number;
  public promptId!: number;
  public output!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PromptOutput.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    promptId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Prompt,
        key: 'id',
      },
    },
    output: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'prompt_outputs',
  }
);

PromptOutput.belongsTo(Prompt, { foreignKey: 'promptId', as: 'prompt' });
Prompt.hasMany(PromptOutput, { foreignKey: 'promptId', as: 'outputs' });

export default PromptOutput;
