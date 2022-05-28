import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    // Validates email
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(emailRegex)) {
      res.status(400);
      throw new Error("Please enter a valid email address");
    }
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      res.status(400);
      throw new Error("User already exists");
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    if (newUser) {
      res.json({
        token: generateToken(newUser._id),
      });
    }
  }
);
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const loggedUser = await User.findOne({ $or: [{ email }, { username }] });
  if (loggedUser && (await bcrypt.compare(password, loggedUser.password))) {
    res.json({ token: generateToken(loggedUser._id) });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});
function generateToken(id: string) {
  if (process.env.JWT_SECRET) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  } else {
    throw new Error("Secret key not provided");
  }
}
