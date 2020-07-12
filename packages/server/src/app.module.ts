import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${process.env.DB_HOST || 'localhost'}/${process.env.DB_NAME || 'wsei'}`, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
    }),
    AuthModule,
    RoomsModule,
  ],
})
export class AppModule {}
