import { Module } from '@nestjs/common';
import { GameRoomController } from './controllers/game-room/game-room.controller';
import { GameRoomService } from './services/game-room/game-room.service';
import { GameInfoController } from './controllers/game-info/game-info.controller';
import { GameGateway } from './gateways/game/game.gateway';
import { GameService } from './services/game/game.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MatchmakingGateway } from './gateways/matchmaking/matchmaking.gateway';
import { RoomController } from './controllers/room/room.controller';
import { RoomService } from './services/room/room.service';

@Module({
    imports: [
        EventEmitterModule.forRoot(),
    ],
    controllers: [GameRoomController, GameInfoController, RoomController],
    providers: [
        GameRoomService,
        GameGateway,
        GameService,
        MatchmakingGateway,
        RoomService,
    ],
})
export class GameModule {}
