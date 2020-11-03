import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../../auth/auth.module';

import { CardsSchema } from './models/cards.schema';
import { CardsController } from './cards.controller';
import { CardsService } from './services/cards.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Card', schema: CardsSchema }]),
    AuthModule,
  ],
  providers: [CardsService],
  controllers: [CardsController],
  exports: [CardsService],
})
export class CardsModule {}
