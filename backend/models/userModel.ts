import { Schema, model } from "mongoose";
// @ts-ignore
import mongooseFuzzySearching from "mongoose-fuzzy-searching";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
userSchema.plugin(mongooseFuzzySearching, { fields: ["username"] });
const User = model("User", userSchema);
export default User;
