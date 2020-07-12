import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { RegisterDTO } from '../../auth/models/auth.dto';
import { sanitizeUser } from '../helpers/sanitize-user';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  /**
   * Creates the user and saves to db
   * @param {RegisterDTO} registerDTO
   * @return {Promise<Omit<User, "password">>}
   */
  async create(registerDTO: RegisterDTO): Promise<Omit<User, 'password'>> {
    const { username, password } = registerDTO;

    const salt = await bcrypt.genSalt(Number(process.env.HASH_SALT_SIZE) || 10);
    const newUser = new this.userModel({
      username,
      password: await bcrypt.hash(password, salt),
    } as RegisterDTO);
    await newUser.save();

    return sanitizeUser(newUser);
  }

  /**
   * Gets all users
   * @return {Promise<User[]>}
   */
  async getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  /**
   * Gets one user
   * accepts all params except password and created at
   * @param {Partial<User>} params
   * @param {boolean} sanitize
   * @return {Promise<User>}
   */
  async findUser(
    params: Partial<Omit<User, 'password' | 'createdAt'>>,
    sanitize?: boolean,
  ): Promise<User | Omit<User, 'password'>> {
    const { id, ...rest } = params;
    const userIdParam = id ? { _id: id } : {};

    const user = await this.userModel
      .findOne({ ...rest, ...userIdParam })
      .select('username password _id createdAt')
      .exec();

    return sanitize && user ? sanitizeUser(user) : user;
  }
}
