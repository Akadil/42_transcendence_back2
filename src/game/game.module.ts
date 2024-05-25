import { Module } from '@nestjs/common';
import { GameUserController } from './controllers/game-user/game-user.controller';
import { GameUserService } from './services/game-user/game-user.service';
import { GameRoomController } from './controllers/game-room/game-room.controller';
import { GameRoomService } from './services/game-room/game-room.service';
import { GameInterractionGateway } from './gateways/game-interraction/game-interraction.gateway';
import { GameInterractionService } from './services/game-interraction/game-interraction.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: 'your_secret_key',
            signOptions: { expiresIn: '2h' },
        }),
    ],
    controllers: [GameUserController, GameRoomController],
    providers: [
        GameUserService,
        GameRoomService,
        GameInterractionGateway,
        GameInterractionService,
    ],
})
export class GameModule {}
