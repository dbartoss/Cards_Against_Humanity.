import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { ILoginDTO, IRegisterDTO } from './models/auth.dto';
import { IAuthModel } from './models/IAuthModel';
import { AuthService } from './services';
import { LocalAuthGuard } from './guards';
import { IUser } from '../users/models/user.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerDTO: IRegisterDTO,
  ): Promise<Omit<IUser, 'password'>> {
    return this.authService.register(registerDTO);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDTO: ILoginDTO): Promise<IAuthModel> {
    return this.authService.login(loginDTO);
  }
}
