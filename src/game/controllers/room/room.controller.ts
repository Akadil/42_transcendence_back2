import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateRoomDto } from 'src/game/dtos/createRoom.dto';
import { RoomService } from 'src/game/services/room/room.service';

@Controller('room')
export class RoomController {
    constructor(private roomService: RoomService) {}

    @Post()
    createRoom(@Body() dto: CreateRoomDto) {
        return this.roomService.create(dto);
    }

    @Get()
    getAllRooms() {
        return this.roomService.getAll();
    }

    @Delete(':id')
    deleteRoom(@Param('id') id: string) {
        return this.roomService.delete(id);
    }

    @Patch(':id')
    updateRoom(@Param('id') id: string) {
        return this.roomService.update(id);
    }
}
