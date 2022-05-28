import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/userModel";
import Todo from "../models/todoModel";
type IUser = {
  username: string;
  email: string;
  password: string;
  id: string;
} | null;
export const newTodo = asyncHandler(async (req: Request, res: Response) => {
  const { username } = req.body;
  const user: IUser = await User.findOne({ username });
  if (user) {
    const newTodo = await Todo.create({ text: "Hello world", user: user.id });
  }
  res.send(newTodo);
});
