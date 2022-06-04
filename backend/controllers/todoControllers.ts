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
  const user: IUser = await User.findById(req.user!.id);
  if (user) {
    const todo = await Todo.create({ text: req.body.text, user: user.id });
    res.json({ todo });
  }
});
export const getOwnTodos = asyncHandler(async (req: Request, res: Response) => {
  const todos = await Todo.find({ user: req.user!.id });
  res.json(todos);
});
export const getUserTodos = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    const todos = await Todo.find({ user: user.id });
    res.json({ todos, username: user.displayName });
  }
);
export const toggleTodo = asyncHandler(async (req: Request, res: Response) => {
  const todo = await Todo.findById(req.params.id);
  if (req.user!.id === todo.user.toString()) {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        completed: !todo.completed,
      },
      { new: true }
    );
    res.json({ updatedTodo });
  } else {
    res.status(400);
    throw new Error("Not allowed to update this todo");
  }
});
export const removeTodo = asyncHandler(async (req: Request, res: Response) => {
  const todo = await Todo.findById(req.params.id);
  if (req.user!.id === todo.user.toString()) {
    todo.remove();
    res.json({ message: "Todo has been successfully removed" });
  }
});
