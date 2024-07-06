import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { GameRoomService } from '../../services/game-room/game-room.service';
import { CreateGameRoomDto } from '../../dtos/gameRoom/create-game-room.dto';
import { joinGameRoomDto } from '../../dtos/gameRoom/join-game-room.dto';

@Controller('game-room')
export class GameRoomController {
    constructor(private gameRoomService: GameRoomService) {}

    /**
     * Retrieve a game room by its id
     *
     * @todo    Should return a DTO instead of the entity
     */
    @Get(':id')
    @UsePipes(ValidationPipe)
    getGameRoom(@Param('id') id: string) {
        return this.gameRoomService.get(id);
    }

    @Get('all')
    getAllGameRooms() {
        return this.gameRoomService.getAll();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createGameRoom(@Body() dto: CreateGameRoomDto) {
        return this.gameRoomService.create(dto);
    }

    @Patch('join')
    @UsePipes(ValidationPipe)
    joinGameRoom(@Body() dto: joinGameRoomDto) {
        return this.gameRoomService.join(dto.roomId, dto.playerId);
    }

    @Patch('leave')
    leaveGameRoom(@Body() dto: joinGameRoomDto) {
        return this.gameRoomService.leave(dto.roomId, dto.playerId);
    }

    @Delete(':id')
    @UsePipes(ValidationPipe)
    deleteGameRoom(@Param('id') id: string) {
        return this.gameRoomService.delete(id);
    }
}
