import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { IRegisterDTO } from '../../auth/models/auth.dto';
import { getIdParam } from '../../helpers/id-param';
import { sanitizeUser } from '../helpers/sanitize-user';
import { IUser } from '../models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  /**
   * Creates the user and saves to db
   * @param {IRegisterDTO} registerDTO
   * @return {Promise<Omit<IUser, "password">>}
   */
  async create(registerDTO: IRegisterDTO): Promise<Omit<IUser, 'password'>> {
    const { username, password } = registerDTO;

    const salt = await bcrypt.genSalt(Number(process.env.HASH_SALT_SIZE) || 10);
    const newUser = new this.userModel({
      username,
      password: await bcrypt.hash(password, salt),
    } as IRegisterDTO);
    await newUser.save();

    return sanitizeUser(newUser);
  }

  /**
   * Gets all users
   * @return {Promise<IUser[]>}
   */
  async getUsers(): Promise<IUser[]> {
    return this.userModel.find().exec();
  }

  /**
   * Gets one user
   * accepts all params except password and created at
   * @param {Partial<IUser>} params
   * @param {boolean} sanitize
   * @return {Promise<IUser>}
   */
  async findUser(
    params: Partial<Omit<IUser, 'password' | 'createdAt'>>,
    sanitize?: boolean,
  ): Promise<IUser | Omit<IUser, 'password'>> {
    const { id, ...rest } = params;
    const idParam = getIdParam(id);

    const user = await this.userModel
      .findOne({ ...rest, ...idParam })
      .select('username password _id createdAt')
      .exec();

    return sanitize && user ? sanitizeUser(user) : user;
  }
}
