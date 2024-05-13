import { Injectable } from '@nestjs/common';
import { GameRoom } from '../../entities/game-room';
import { CreateGameRoom } from '../../dtos/gameRoom/create-game-room.interface';
import { GameUserService } from '../game-user/game-user.service';

@Injectable()
export class GameRoomService {
    private static roomId = 0;
    private rooms: Map<string, GameRoom> = new Map<string, GameRoom>();

    constructor(private gameUserService: GameUserService) {}

    get(id: string): GameRoom | null {
        if (this.rooms.has(id)) {
            return this.rooms.get(id);
        }
        return null;
    }

    create(data: CreateGameRoom): string {
        if (!this.verifyPlayers(data.leftPlayerId, data.rightPlayerId)) {
            throw new Error('Invalid player id');
        }

        const newRoom = new GameRoom();
        newRoom.id = this.generateId();
        newRoom.leftPlayerId = data.leftPlayerId;
        newRoom.rightPlayerId = data.rightPlayerId;
        
        this.rooms.set(newRoom.id, newRoom);

        return newRoom.id;
    }

    getAll(): GameRoom[] {
        const gameRooms: GameRoom[] = [];

        for (const room of this.rooms.values()) {
            gameRooms.push(room);
        }
        return gameRooms;
    }

    // join(): string {
    //     return 'This action joins a game room';
    // }

    /* ********************************************************************** */
    /* ************************ PRIVATE METHODS ***************************** */
    /* ********************************************************************** */

    private generateId(): string {
        return (GameRoomService.roomId++).toString();
    }

    private serializeGameRoom(room: GameRoom): GameRoom {
        return room;
    }

    private deserializeGameRoom(room: GameRoom): GameRoom {
        return room;
    }

    private verifyPlayers(leftPlayerId: string, rightPlayerId: string): boolean {
        if (this.gameUserService.verify(leftPlayerId) == false)
            return false;
        if (rightPlayerId && this.gameUserService.verify(rightPlayerId)) 
            return false;
        return true;
    }
}
