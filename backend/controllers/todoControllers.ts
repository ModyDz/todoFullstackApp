import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../models/userModel";
import Todo from "../models/todoModel";
interface IUser {
  username: string;
  email: string;
  password: string;
  _id: string;
}
export const newTodo = asyncHandler(async (req: Request, res: Response) => {
  const { username } = req.body;
  const user: any = await User.findOne({ username });
  const newTodo = await Todo.create({ text: "Hello world", user: user.id });
  res.send(newTodo);
});
