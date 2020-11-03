import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards';
import {
  IRoomCreationDTO,
  IRoomJoinDTO,
  IRoomUpdateChoiceDTO,
  IRoomFinishRoundDTO,
} from './models/room.dto';
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
  async getRoomData(@Param('roomId') roomId: string): Promise<IRoom> {
    return this.roomsService.getRoomData(roomId);
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

  @UseGuards(JwtAuthGuard)
  @Post('/updateChoice/:roomId')
  async updateChoice(
    @Param('roomId') roomId: string,
    @Body() roomDTO: IRoomUpdateChoiceDTO,
  ): Promise<IRoom> {
    return this.roomsService.updateChoice(roomId, roomDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/finishRound/:roomId')
  async finishRound(
    @Param('roomId') roomId: string,
    @Body() roomDTO: IRoomFinishRoundDTO,
  ): Promise<IRoom> {
    return this.roomsService.finishRound(roomId, roomDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/startGame/:roomId/:userId')
  async startGame(
    @Param('roomId') roomId: string,
    @Param('roomId') userId: string,
  ): Promise<IRoom> {
    return this.roomsService.startGame(roomId, userId);
  }
}
