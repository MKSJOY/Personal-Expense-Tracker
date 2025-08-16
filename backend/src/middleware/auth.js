import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { httpUnauthorized } from '../utils/httpErrors.js';

export const auth = async (req, _res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) throw httpUnauthorized('No token provided');

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub).select('-password');
    if (!user) throw httpUnauthorized('User not found');

    req.user = user;
    next();
  } catch (err) {
    err.status = err.status || 401;
    next(err);
  }
};
