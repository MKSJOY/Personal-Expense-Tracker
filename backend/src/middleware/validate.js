import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) return next();
  const errors = result.array().map(e => ({ field: e.path, msg: e.msg }));
  return res.status(422).json({ message: 'Validation error', errors });
};
