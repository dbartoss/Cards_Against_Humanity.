import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginDTO, RegisterDTO } from '../models/auth.dto';
import { AuthModel } from '../models/auth.model';
import { sanitizeUser } from '../../users/helpers/sanitize-user';
import { User } from '../../users/models/user.model';
import { UsersService } from '../../users/services';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  /**
   * Gets the user by params and compares passwords
   * @param {string} username
   * @param {string} password
   * @return {Promise<Omit<User, "password">>}
   */
  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = (await this.usersService.findUser({ username })) as User;

    if (!user) {
      throw new NotFoundException();
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    return sanitizeUser(user);
  }

  /**
   * Gets the user by params and creates a new one
   * if there's no user with the same username already
   * @param {RegisterDTO} registerDTO
   * @return {Promise<Omit<User, "password">>}
   */
  async register(registerDTO: RegisterDTO): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findUser({
      username: registerDTO.username,
    });

    if (user) {
      throw new ConflictException('User with following name already exists');
    }

    return this.usersService.create(registerDTO);
  }

  /**
   * Validates the user login credentials and returns token with user data
   * @param {LoginDTO} loginDTO
   * @return {Promise<AuthModel>}
   */
  async login(loginDTO: LoginDTO): Promise<AuthModel> {
    const user = await this.validateUser(loginDTO.username, loginDTO.password);
    return { token: await this.jwtService.signAsync(user), user };
  }
}
