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
import { IRoomCreationDTO, IRoomJoinDTO } from '../models/room.dto';
import { IRoom } from '../models/room.model';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel('Room') private roomModel: Model<IRoom>,
    private readonly usersService: UsersService,
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

    const currentPlayerRoom = await this.roomModel.findOne({ players: userId });

    if (currentPlayerRoom) {
      const players = currentPlayerRoom.players.filter(id => id !== userId);
      await currentPlayerRoom.updateOne({ players });
    }

    const newRoom = new this.roomModel({
      name,
      players: [userId],
    });
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

    const currentPlayerRoom = await this.roomModel.findOne({ players: userId }).exec();

    if (currentPlayerRoom) {
      const players =  currentPlayerRoom.players.filter(id => id !== userId);
      await currentPlayerRoom.updateOne({ players });
    }

    const players = [...new Set([...room.players, userId])];
    return this.updateRoom(roomId, { players });
  }

  async getRooms(params: Partial<IRoom> = {}): Promise<IRoom[]> {
    return this.roomModel
      .find(this.prepareParams(params))
      .select('name players createdAt _id')
      .exec();
  }

  async getRoom(params: Partial<IRoom> = {}): Promise<IRoom> {
    return this.roomModel
      .findOne(this.prepareParams(params))
      .select('name players createdAt _id')
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

  private prepareParams(params): Partial<IRoom> {
    const { id, ...restParams } = params;
    const idParams = getIdParam(id);

    return { ...idParams, ...restParams };
  }
}
