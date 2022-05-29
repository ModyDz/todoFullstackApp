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
    if (username.length < 6) {
      res.status(400);
      throw new Error("Username too short");
    }
    if (password.length < 8) {
      res.status(400);
      throw new Error("Password too short");
    }
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      res.status(400);
      throw new Error("User already exists");
    }
    // Password encryption
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username: req.body.username.toLowerCase(),
      email: req.body.email.toLowerCase(),
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
  const loggedUser = await User.findOne({
    $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
  });
  if (loggedUser && (await bcrypt.compare(password, loggedUser.password))) {
    res.json({ token: generateToken(loggedUser._id) });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});
export const searchUser = asyncHandler(async (req: Request, res: Response) => {
  if (req.query.q && req.query.q.length! > 3) {
    // @ts-ignore
    const filteredUsers = await User.fuzzySearch(req.query.q).select([
      "username",
      "-_id",
      "confidenceScore",
    ]);
    console.log(req.query!.q);
    res.json(filteredUsers);
  } else {
    res.status(400);
    throw new Error("Search query too short!");
  }
});
function generateToken(id: string) {
  if (process.env.JWT_SECRET) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
  } else {
    throw new Error("Secret key not provided");
  }
}
