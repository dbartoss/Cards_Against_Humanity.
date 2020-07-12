import { User } from '../../users/models/user.model';

export interface AuthModel {
  token: string;
  user: Omit<User, 'password'>;
}
