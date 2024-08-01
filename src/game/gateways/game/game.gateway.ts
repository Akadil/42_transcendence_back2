import {
  ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameService } from 'src/game/services/game/game.service';

@WebSocketGateway()
export class GameGateway
    implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
    @WebSocketServer()
    server: Server;

    constructor(private gameService: GameService) {}

    afterInit() {
        this.gameService.setServer(this.server);
    }

    handleConnection(@ConnectedSocket() socket: Socket) {
        this.gameService.connection(socket);
    }

    handleDisconnect(@ConnectedSocket() socket: Socket) {
        this.gameService.disconnect(socket);
    }

    @SubscribeMessage('joinRoom')
    joinRoom(@ConnectedSocket() socket: any, @MessageBody() payload: any) {
        this.gameService.joinRoom(socket, payload);
    }

    @SubscribeMessage('message')
    handleMessage(@ConnectedSocket() socket: any, @MessageBody() payload: any) {
        this.gameService.handleMessage(socket, payload);
    }

    @SubscribeMessage('event')
    handleEvent(@ConnectedSocket() socket: any, @MessageBody() payload: any) {
        this.gameService.handleEvent(socket, payload);
    }
}
