import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getIdParam } from '../../helpers/id-param';
import { IRoomCreationDTO } from '../models/room.dto';
import { IRoom } from '../models/room.model';

@Injectable()
export class RoomsService {
  constructor(@InjectModel('Room') private roomModel: Model<IRoom>) {}

  async createRoom(roomDTO: IRoomCreationDTO): Promise<IRoom> {
    if (!roomDTO?.name || !roomDTO?.userId) {
      throw new BadRequestException();
    }

    const room = await this.getRoom({ name: roomDTO.name });

    if (room) {
      throw new ConflictException();
    }

    const newRoom = new this.roomModel({
      name: roomDTO.name,
      players: [roomDTO.userId],
    });
    await newRoom.save();

    return newRoom.toJSON();
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

  private prepareParams(params): Partial<IRoom> {
    const { id, ...restParams } = params;
    const idParams = getIdParam(id);

    return { ...idParams, ...restParams };
  }
}
