import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { User } from './models/user.model';
import { UsersService } from './services';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getUser(
    @Param('userId') userId: string,
  ): Promise<Omit<User, 'password'>> {
    return this.usersService.findUser({ id: userId }, true);
  }
}
