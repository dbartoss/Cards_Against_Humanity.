import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { IUser } from './models/user.model';
import { UsersService } from './services';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(): Promise<IUser[]> {
    return this.usersService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getUser(
    @Param('userId') userId: string,
  ): Promise<Omit<IUser, 'password'>> {
    return this.usersService.findUser({ id: userId }, true);
  }
}
