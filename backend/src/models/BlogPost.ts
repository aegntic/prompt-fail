import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import User from './User';

class BlogPost extends Model {
  public id!: number;
  public userId!: number;
  public title!: string;
  public content!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BlogPost.init(
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'blog_posts',
  }
);

BlogPost.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(BlogPost, { foreignKey: 'userId', as: 'blogPosts' });

export default BlogPost;
