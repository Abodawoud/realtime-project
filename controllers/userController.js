import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

//@desc Create new user
//@route POST /api/v1/users/
//@access Public
export const createUser = asyncHandler(async (req, res) => {
  const { username, email } = req.query; // Extract from query string
  const user = new User({ username, email });
  await user.save();
  res.status(201).json(user);
});

//@desc Get all users
//@route GET /api/v1/users/
//@access Public
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

//@desc Get user by ID
//@route GET /api/v1/users/:id
//@access Public
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});
