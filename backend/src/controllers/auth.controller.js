import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { httpBadRequest } from '../utils/httpErrors.js';

const signToken = (userId) =>
  jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) throw httpBadRequest('Email already registered');

    const user = await User.create({ name, email, password });
    const token = signToken(user._id);

    res.status(201).json({ token, user: { _id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) throw httpBadRequest('Invalid credentials');

    const ok = await user.comparePassword(password);
    if (!ok) throw httpBadRequest('Invalid credentials');

    const token = signToken(user._id);
    res.json({ token, user: { _id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
};

export const me = async (req, res) => {
  res.json({ user: req.user });
};
