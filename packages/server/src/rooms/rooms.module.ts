import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { CardsModule } from './cards/cards.module';
import { RoomSchema } from './models/room.schema';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './services/rooms.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }]),
    AuthModule,
    CardsModule,
  ],
  providers: [RoomsService],
  controllers: [RoomsController],
})
export class RoomsModule {}
