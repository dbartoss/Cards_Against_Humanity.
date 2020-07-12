import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://localhost/${process.env.DB_NAME}`),
    AuthModule
  ],
})
export class AppModule {}
