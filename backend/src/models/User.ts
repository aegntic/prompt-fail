import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  username?: string;
  email?: string;
  password?: string;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password!, salt);
    return next();
  } catch (err: any) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password!);
};

export default mongoose.model<IUser>('User', UserSchema);
