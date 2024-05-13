import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { GameRoomService } from '../../services/game-room/game-room.service';
import { CreateGameRoomDto } from '../../dtos/gameRoom/createGameRoom.dto';

@Controller('game-room')
export class GameRoomController {
    constructor(private gameRoomService: GameRoomService) {}

    /**
     * Retrieve a game room by its id
     * 
     * @todo    Should return a DTO instead of the entity
     */
    @Get(':id')
    getGameRoom(@Param('id') id: string) {
        return this.gameRoomService.get(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createGameRoom(@Body() dto: CreateGameRoomDto) {
        return this.gameRoomService.create(dto);
    }

    @Get('all')
    getAllGameRooms() {
        return this.gameRoomService.getAll();
    }

    // @Post('join')
    // joinGameRoom() {
    //     return this.gameRoomService.join();
    // }
}
