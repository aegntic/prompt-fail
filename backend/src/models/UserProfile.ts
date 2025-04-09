import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import User from './User';

class UserProfile extends Model {
  public id!: number;
  public userId!: number;
  public bio!: string | null;
  public profilePicture!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserProfile.init(
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
      unique: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'user_profiles',
  }
);

UserProfile.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasOne(UserProfile, { foreignKey: 'userId', as: 'profile' });

export default UserProfile;
