import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './guards';
import {
  AuthService,
  JwtStrategyService,
  LocalStrategyService,
} from './services';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'WSEI',
      signOptions: { expiresIn: process.env.JWT_EXPIRE_TIME || '3d' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategyService,
    JwtAuthGuard,
    JwtStrategyService,
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
