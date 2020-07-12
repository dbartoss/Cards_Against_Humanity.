import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards';
import { IRoomCreationDTO, IRoomJoinDTO } from './models/room.dto';
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

  @UseGuards(JwtAuthGuard)
  @Patch(':roomId')
  async joinToRoom(
    @Param('roomId') roomId: string,
    @Body() roomDTO: IRoomJoinDTO,
  ): Promise<IRoom> {
    return this.roomsService.joinToRoom(roomId, roomDTO);
  }
}
