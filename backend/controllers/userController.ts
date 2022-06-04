import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    let { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    // Validates email
    const emailRegex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!email.match(emailRegex)) {
      res.status(400);
      throw new Error("Please enter a valid email address");
    }
    // Validates username
    const usernameRegex = /^[a-zA-Z0-9_.]+$/;
    if (!username.match(usernameRegex)) {
      res.status(400);
      throw new Error("Invalid username");
    }
    if (username.length < 6) {
      res.status(400);
      throw new Error("Username too short");
    }
    if (password.length < 8) {
      res.status(400);
      throw new Error("Password too short");
    }
    const existingUser = await User.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: email.toLowerCase() },
      ],
    });
    if (existingUser) {
      res.status(400);
      throw new Error("User already exists");
    }
    // Password encryption
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      displayName: username,
      username: req.body.username.toLowerCase(),
      email: req.body.email.toLowerCase(),
      password: hashedPassword,
    });
    if (newUser) {
      res.json({
        token: generateToken(newUser._id),
        username: newUser.displayName,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
      });
    }
  }
);
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const loggedUser = await User.findOne({
    $or: [
      { username: username.toLowerCase() },
      { email: username.toLowerCase() },
    ],
  });
  if (loggedUser && (await bcrypt.compare(password, loggedUser.password))) {
    res.json({
      token: generateToken(loggedUser._id),
      username: loggedUser.displayName,
      email: loggedUser.email,
      profilePicture: loggedUser.profilePicture,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

export const uploadUserPicture = asyncHandler(
  async (req: Request, res: Response) => {
    const { picture } = req.body;
    const LoggedUser = await User.findById(req.user!.id);
    if (LoggedUser) {
      const updatedUser = await User.findByIdAndUpdate(
        req.user?.id,
        { profilePicture: picture },
        { new: true }
      );
      res.json({
        token: generateToken(updatedUser._id),
        username: updatedUser.displayName,
        email: updatedUser.email,
        profilePicture: updatedUser.profilePicture,
      });
    }
  }
);
export const searchUsers = asyncHandler(async (req: Request, res: Response) => {
  if (req.query.q) {
    // @ts-ignore
    const filteredUsers = await User.fuzzySearch(req.query.q).select([
      "displayName",
      "profilePicture",
      "-_id",
      "confidenceScore",
    ]);
    res.json(filteredUsers);
  }
});
export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findOne({ username: req.params.username }).select([
    "displayName",
    "profilePicture",
  ]);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  res.status(200).json(user);
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
