import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards';
import { ICard } from './models/cards.model';
import { CardsService } from './services/cards.service';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/draw-black')
  async getBlackCard(): Promise<ICard[]> {
    return this.cardsService.drawCards({ number: 1 }, 'black');
  }

  @UseGuards(JwtAuthGuard)
  @Get('/draw-white/:numberOfCards')
  async getWhiteCards(@Param('numberOfCards') numberOfCards: number): Promise<ICard[]> {
    return this.cardsService.drawCards({ number: numberOfCards }, 'white');
  }
}
