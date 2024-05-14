import {
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { GameInterractionService } from '../../services/game-interraction/game-interraction.service';

/**
 * Gateway for game interraction. Handles the game process.
 *
 * @details	the authorization is done through handshake and token
 * @details in order to access the game, make a POST request to /game/join
 */
@WebSocketGateway()
export class GameInterractionGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    constructor(private myService: GameInterractionService) {}

    handleConnection(@ConnectedSocket() socket: Socket): any {
        const data = this.myService.handleConnection(socket);

        if (data.isValid) {
            socket.join(data.roomId);
            socket.emit('connection', {
                success: true,
                roomInfo: data.room,
                message: 'You joined the room.',
            });
            this.server.to(data.roomId).emit('joining', {
                username: data.username,
                message: 'joined the room.',
            });
        } else {
            socket.emit('connection', {
                success: false,
                roomInfo: null,
                message: "You didn't join any room. Please try again.",
            });
            socket.disconnect();
        }
    }

    handleDisconnect(@ConnectedSocket() client: Socket): any {
        console.log('Client disconnected. Dommage.');
    }

    @SubscribeMessage('message')
    handleMessage(@ConnectedSocket() client: any, payload: any): string {
        return 'Hello world!';
    }
}
