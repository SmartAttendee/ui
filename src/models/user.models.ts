import mongoose from "mongoose";

export interface UserInterface extends mongoose.Document {
  clerkId: string;
  email: string;
  username: string;
  phoneNumber: number;
  avatar: string;
  organizationName: string;
  role: ["Admin", "Employee"];
}

const UserSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    phoneNumber: { type: Number, required: true, unique: true },
    avatar: { type: String },
    organizationName: { type: String, required: true },
    role: { type: String, enum: ["Admin", "Employee"], default: "Employee" },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
