// import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
// import { AuthService } from './auth/services';
// import { LocalAuthGuard, JwtAuthGuard } from './auth/guards';
//
// @Controller()
// export class AppController {
//   constructor(private readonly authService: AuthService) {}
//
//   @Post('auth/register')
//   async register(@Request() req) {
//     return this.authService.register(req.body);
//   }
//
//   @UseGuards(LocalAuthGuard)
//   @Post('auth/login')
//   async login(@Request() req) {
//     return this.authService.login(req.user);
//   }
//
//   @UseGuards(JwtAuthGuard)
//   @Get('profile')
//   getProfile(@Request() req) {
//     return req.user;
//   }
// }
