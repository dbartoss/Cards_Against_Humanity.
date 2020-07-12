import { IUser } from '../../users/models/user.model';

export interface IAuthModel {
  token: string;
  user: Omit<IUser, 'password'>;
}
