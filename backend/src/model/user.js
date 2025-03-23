import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const UserSchema = new Schema(
  {
    fullName: { type: String, required: true },
    company: { type: String },
    phone: { type: Number },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 8},
  },
  { timestamps: true }
);

const UserModel = model("User", UserSchema);

export default UserModel