import { Injectable } from '@nestjs/common';
import { ConnectedSocket } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { GameConnection } from '../../dtos/game-interraction/gameConnection.interface';

@Injectable()
export class GameInterractionService {
    constructor() {}

    handleConnection(@ConnectedSocket() client: Socket): GameConnection {
        let response: GameConnection;

        return {
            isValid: true,
            username: 'test',
            room: {},
            roomId: '123',
        };
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
