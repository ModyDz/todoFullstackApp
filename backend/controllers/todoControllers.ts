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
  const user: IUser = await User.findOne({ _id: req.user!.id });
  if (user) {
    const todo = await Todo.create({ text: req.body.text, user: user.id });
    res.json({ todo });
  }
});
export const getOwnTodos = asyncHandler(async (req: Request, res: Response) => {
  const todos = await Todo.find({ user: req.user!.id });
  res.json({ todos });
});
export const getUserTodos = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    const todos = await Todo.find({ user: user.id });
    res.json({ todos });
  }
);
