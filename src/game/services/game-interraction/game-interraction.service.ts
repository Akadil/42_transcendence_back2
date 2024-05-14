import { Injectable } from '@nestjs/common';
import { ConnectedSocket } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { GameConnection } from '../../dtos/game-interraction/gameConnection.interface';
import { GameUserService } from '../game-user/game-user.service';
import { GameRoomService } from '../game-room/game-room.service';

/**
 * @todo    change "client: any" to "client: Socket_updated" in handleConnection
 */
@Injectable()
export class GameInterractionService {
    constructor(
        private readonly gameUserService: GameUserService,
        private gameRoomService: GameRoomService,
    ) {}

    handleConnection(@ConnectedSocket() client: any): GameConnection {
        let response: GameConnection;
        const roomId = this.gameRoomService.getRoomByUser(client.user.id)

        if (roomId) {
            response.isValid = true;
            response.username = client.user.username;
            response.room = this.gameRoomService.get(roomId);
            response.roomId = roomId;
        } else {
            response = {
                isValid: false,
                username: '',
                room: {},
                roomId: '',
            };
        }
        return response;
    }

    handleDisconnect(client: Socket) {
        console.log('Client disconnected');
    }

    handleMessage(client: Socket, payload: any) {
        console.log('Message received');
    }

    handleButtonRelease(client: Socket, payload: any) {
        console.log('Button released');
    }

    handleButtonPress(client: Socket, payload: any) {
        console.log('Button pressed');
    }
}
