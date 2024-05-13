import { Module } from '@nestjs/common';
import { GameUserController } from './controllers/game-user/game-user.controller';
import { GameUserService } from './services/game-user/game-user.service';
import { GameRoomController } from './controllers/game-room/game-room.controller';
import { GameRoomService } from './services/game-room/game-room.service';

@Module({
    imports: [],
    controllers: [GameUserController, GameRoomController],
    providers: [GameUserService, GameRoomService],
})
export class GameModule {}
