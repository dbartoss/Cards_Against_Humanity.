import { User } from '../models/user.model';

export const sanitizeUser = (user: User): Omit<User, 'password'> => {
  const { password, ...sanitized } = user.toJSON();
  return sanitized;
};
