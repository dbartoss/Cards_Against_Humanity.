import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards';
import { IRoomCreationDTO } from './models/room.dto';
import { IRoom } from './models/room.model';
import { RoomsService } from './services/rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getRooms(): Promise<IRoom[]> {
    return this.roomsService.getRooms();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':roomId')
  async getUser(@Param('roomId') roomId: string): Promise<IRoom> {
    return this.roomsService.getRoom({ id: roomId });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createRoom(@Body() roomDTO: IRoomCreationDTO): Promise<IRoom> {
    return this.roomsService.createRoom(roomDTO);
  }
}
