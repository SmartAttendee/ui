import mongoose from "mongoose";

export interface OrganizationInterface extends mongoose.Document {
  organizationName: string;
  country: string;
  email: string;
  industry: string;
  size: string;
  employees: string[];
}

const OrganizationSchema = new mongoose.Schema(
  {
    organizationName: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    email: { type: String, required: true },
    industry: { type: String, required: true },
    size: { type: String, required: true },
    employees: [String],
  },
  { timestamps: true }
);

const Organization =
  mongoose.models.Organization ||
  mongoose.model("Organization", OrganizationSchema);

export default Organization;
