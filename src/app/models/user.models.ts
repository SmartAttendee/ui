import mongoose from "mongoose";

export interface UserInterface extends mongoose.Document {
  email: string;
  password: string;
  role: string[];
  accessToken: string;
  refreshToken: string;
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: [String], enum: ["Admin", "User"], required: true },
  accessToken: { type: String },
  refreshToken: { type: String },
});

const User = mongoose.model<UserInterface>("User", UserSchema);

export default User;
