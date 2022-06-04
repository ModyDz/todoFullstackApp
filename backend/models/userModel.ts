import { Schema, model } from "mongoose";
// @ts-ignore
import mongooseFuzzySearching from "mongoose-fuzzy-searching";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    displayName: { type: String, required: true, unique: true },
    profilePicture: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/dnici9sgk/image/upload/v1654269415/TodoApp/Placeholder_vspnr9.png",
    },
  },
  { timestamps: true }
);
userSchema.plugin(mongooseFuzzySearching, { fields: ["username"] });
const User = model("User", userSchema);
export default User;
