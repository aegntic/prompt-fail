import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import BlogPost from './BlogPost';

class BlogPostImage extends Model {
  public id!: number;
  public blogPostId!: number;
  public imageUrl!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BlogPostImage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    blogPostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: BlogPost,
        key: 'id',
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'blog_post_images',
  }
);

BlogPostImage.belongsTo(BlogPost, { foreignKey: 'blogPostId', as: 'blogPost' });
BlogPost.hasMany(BlogPostImage, { foreignKey: 'blogPostId', as: 'images' });

export default BlogPostImage;
