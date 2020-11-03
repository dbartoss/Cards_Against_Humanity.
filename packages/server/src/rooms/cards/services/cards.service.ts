import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ICard } from '../models/cards.model';
import { ICardDrawDTO } from '../models/cards.dto';
import { Model } from 'mongoose';

@Injectable()
export class CardsService {
  constructor(@InjectModel('Card') private cardModel: Model<ICard>) {}

  async drawCards(cardDrawDTO: ICardDrawDTO, type: string): Promise<ICard[]> {
    if (!cardDrawDTO?.number || !['white', 'black'].includes(type)) {
      throw new BadRequestException();
    }

    const { number } = cardDrawDTO;

    const totalCards: number = await this.cardModel.count({ type });

    const randomCards: ICard[] = [];

    for (let i = 0; i < number; i++) {
      const skip: number = Math.floor(Math.random() * totalCards);
      const card: ICard = await this.cardModel
        .findOne({ type })
        .skip(skip)
        .exec();
      randomCards.push(card.toJSON());
    }

    return randomCards;
  }
}
