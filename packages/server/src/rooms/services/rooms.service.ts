import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { getIdParam } from '../../helpers/id-param';
import { UsersService } from '../../users/services';
import {
  IRoomCreationDTO,
  IRoomJoinDTO,
  IRoomUpdateChoiceDTO,
  IRoomFinishRoundDTO,
} from '../models/room.dto';
import { IRoom, IPlayerSchema, RoundSchema } from '../models/room.model';
import { CardsService } from 'src/rooms/cards/services/cards.service';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel('Room') private roomModel: Model<IRoom>,
    private readonly usersService: UsersService,
    private readonly cardsService: CardsService,
  ) {}

  async createRoom(roomDTO: IRoomCreationDTO): Promise<IRoom> {
    if (!roomDTO?.name || !roomDTO?.userId) {
      throw new BadRequestException();
    }

    const { name, userId } = roomDTO;

    const room = await this.getRoom({ name });

    if (room) {
      throw new ConflictException();
    }

    const currentPlayerRoom = await this.roomModel.findOne({
      'players.userId': userId,
    });

    if (currentPlayerRoom) {
      const players = currentPlayerRoom.players.filter(
        player => player.userId !== userId,
      );
      await currentPlayerRoom.updateOne({ players });
    }

    const newPlayer: IPlayerSchema = {
      userId,
      currentPoints: 0,
      ableToStartGame: false,
    };

    const newRoom = new this.roomModel({ name, players: [newPlayer] });
    await newRoom.save();

    return newRoom.toJSON();
  }

  async joinToRoom(roomId: string, { userId }: IRoomJoinDTO): Promise<IRoom> {
    if (!roomId || !userId) {
      throw new BadRequestException();
    }

    const room = await this.getRoom({ id: roomId });

    if (!room) {
      throw new NotFoundException('Room with the following id does not exist');
    }

    const user = await this.usersService.findUser({ id: userId });

    if (!user) {
      throw new NotFoundException('User with the following id does not exist');
    }

    const currentPlayerRoom = await this.roomModel
      .findOne({ 'players.userId': userId })
      .exec();

    if (currentPlayerRoom) {
      const players = currentPlayerRoom.players.filter(
        player => player.userId !== userId,
      );
      await currentPlayerRoom.updateOne({ players });
    }

    const newPlayer: IPlayerSchema = {
      userId,
      currentPoints: 0,
      ableToStartGame: false,
    };

    const players: IPlayerSchema[] = [...new Set([...room.players, newPlayer])];

    return this.updateRoom(roomId, { players });
  }

  async getRooms(params: Partial<IRoom> = {}): Promise<IRoom[]> {
    return this.roomModel
      .find(RoomsService.prepareParams(params))
      .select('name players createdAt _id')
      .exec();
  }

  async startGame(roomId: string, userId: string): Promise<IRoom> {
    if (!roomId || !userId) {
      throw new BadRequestException();
    }

    console.log(roomId, userId);

    const room = await this.getRoom({ id: roomId });

    console.log(room);

    if (!room) {
      throw new NotFoundException('Could not find any room with this user');
    }

    const players = room.players.map((player: IPlayerSchema) => {
      if (player.userId === userId) {
        console.log('XDD');
      }
      return player.userId === userId
        ? { ...player, ableToStartGame: true }
        : player;
    });

    await room.updateOne({ players });

    return room.toJSON();
  }

  async updateChoice(
    roomId: string,
    roomDTO: IRoomUpdateChoiceDTO,
  ): Promise<IRoom> {
    if (!roomId || !roomDTO?.cardText || !roomDTO?.userId) {
      throw new BadRequestException();
    }

    const room = await this.getRoom(
      { id: roomId },
      'name players createdAt _id currentRound',
    );

    if (!room) {
      throw new NotFoundException('Room with the following id does not exist');
    }

    const currentRound = room.currentRound;

    if (!currentRound?.currentlySelectedCards) {
      currentRound.currentlySelectedCards = [];
    }

    currentRound.currentlySelectedCards.push(roomDTO);

    await room.updateOne({ currentRound });

    return room.toJSON();
  }

  async getRoomData(roomId: string): Promise<IRoom> {
    if (!roomId) {
      throw new BadRequestException();
    }

    const room = await this.getRoom({ id: roomId }, '');

    if (!room) {
      throw new NotFoundException('Room with the following id does not exist');
    }

    return room.toJSON();
  }

  async finishRound(
    roomId: string,
    roomDTO: IRoomFinishRoundDTO,
  ): Promise<IRoom> {
    if (!roomId || !roomDTO?.userId || !roomDTO?.victorId) {
      throw new BadRequestException();
    }

    const { userId, victorId } = roomDTO;

    const room = await this.getRoom({ id: roomId });

    if (!room) {
      throw new NotFoundException('Room with the following id does not exist');
    }

    const currentRound = room.currentRound;
    if (currentRound?.selector !== userId) {
      throw new BadRequestException();
    }

    const players: IPlayerSchema[] = room.players.map(
      ({ userId, currentPoints: points, ...player }: IPlayerSchema) => {
        const currentPoints = userId === victorId ? points + 1 : points;
        return { userId, currentPoints, ...player };
      },
    );

    const playersIds: string[] = room.players.map(
      (player: IPlayerSchema) => player.userId,
    );

    const newCard = await this.cardsService.drawCards({ number: 1 }, 'black');
    const selector = RoomsService.getNewSelector(playersIds);

    const { text: mainCardText, fillSpaces: mainCardGaps } = newCard[0];

    const newRound: RoundSchema = {
      selector,
      mainCardText,
      mainCardGaps,
      currentlySelectedCards: [],
    };

    await room.updateOne({ players, currentRound: newRound });

    return room.toJSON();
  }

  private async getRoom(
    params: Partial<IRoom> = {},
    selector = 'name players createdAt _id',
  ): Promise<IRoom> {
    return this.roomModel
      .findOne(RoomsService.prepareParams(params))
      .select(selector)
      .exec();
  }

  private async updateRoom(
    roomId: string,
    updateValues: Partial<Omit<IRoom, 'id'>>,
  ): Promise<IRoom> {
    await this.roomModel.updateOne(
      { ...getIdParam(roomId) },
      { ...updateValues },
    );
    return this.getRoom({ id: roomId });
  }

  private static prepareParams(params): Partial<IRoom> {
    const { id, ...restParams } = params;
    const idParams = getIdParam(id);

    return { ...idParams, ...restParams };
  }

  private static getNewSelector(playersIds: string[]): string {
    return playersIds[Math.floor(Math.random() * playersIds.length)];
  }
}
