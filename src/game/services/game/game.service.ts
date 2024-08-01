import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Server, Socket } from 'socket.io';

@Injectable()
export class GameService {
    server: Server;

    // constructor() { }
    setServer(server: Server) {
        this.server = server;
    }

    /**
     * Clients connects to the game socket
     * 
     * @todo    return list of ongoing games
     */
    connection(client: Socket) {
        console.log('Bienvenue, mon frere!');
    }

    disconnect(client: Socket) {
        console.log('socket disconnected, dommage...');
    }

    @OnEvent('room.created')
    handleRoomCreatedEvent(payload: any) {
        console.log('Room created', payload);
    }

    @OnEvent('room.deleted')
    handleRoomDeletedEvent(payload: any) {
        console.log('Room deleted', payload);
    }

    joinRoom(client: Socket, payload: any) {
        console.log('Tu veux jouer?');
    }

    handleMessage(client: Socket, payload: any) {
        console.log('Ta dis quoi?');
    }

    handleEvent(client: Socket, payload: any) {
        console.log('Alors dance...');
    }
}
