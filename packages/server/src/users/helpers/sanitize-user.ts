import { IUser } from '../models/user.model';

export const sanitizeUser = (user: IUser): Omit<IUser, 'password'> => {
  const { password, ...sanitized } = user.toJSON();
  return sanitized;
};
