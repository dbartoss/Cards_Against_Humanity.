import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { LoginDTO, RegisterDTO } from './models/auth.dto';
import { AuthModel } from './models/auth.model';
import { AuthService } from './services';
import { LocalAuthGuard } from './guards';
import { User } from '../users/models/user.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerDTO: RegisterDTO,
  ): Promise<Omit<User, 'password'>> {
    return this.authService.register(registerDTO);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDTO: LoginDTO): Promise<AuthModel> {
    return this.authService.login(loginDTO);
  }
}
