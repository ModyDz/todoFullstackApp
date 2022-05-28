import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);
const Todo = model("Todo", todoSchema);
export default Todo;
