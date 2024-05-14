import { Injectable } from '@nestjs/common';
import { GameRoom } from '../../entities/game-room';
import { CreateGameRoom } from '../../dtos/gameRoom/create-game-room.interface';
import { GameUserService } from '../game-user/game-user.service';

/**
 * Service responsible for handling GameRoom entity
 *
 * @details The rooms are not saved in database but in memory, because it is current rooms of a game
 */
@Injectable()
export class GameRoomService {
    private static roomId = 0;
    // roomId -> GameRoom
    private rooms: Map<string, GameRoom> = new Map<string, GameRoom>();
    // userId -> GameRoom
    private userToRoom: Map<string, GameRoom> = new Map<string, GameRoom>();

    constructor(private gameUserService: GameUserService) {}

    get(id: string): GameRoom | null {
        if (this.rooms.has(id)) {
            return this.rooms.get(id);
        }
        return null;
    }

    getAll(): GameRoom[] {
        const gameRooms: GameRoom[] = [];

        for (const room of this.rooms.values()) {
            gameRooms.push(room);
        }
        return gameRooms;
    }

    getRoomByUser(userId: string): GameRoom | null {
        if (this.userToRoom.has(userId)) {
            return this.userToRoom.get(userId);
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

    join(roomId: string, userId: string) {
        const gameRoom = this.rooms.get(roomId);
        const user = this.gameUserService.findOneById(userId);

        if (!gameRoom) {
            throw new Error('Game room not found');
        } else if (!user) {
            throw new Error('User not found');
        }

        gameRoom.spectators.push(userId);
    }

    /**
     * Leave a game room
     *
     * @todo    Handle the case where the user is a player
     */
    leave(roomId: string, userId: string) {
        const gameRoom = this.rooms.get(roomId);
        const user = this.gameUserService.verify(userId);

        if (!gameRoom) {
            throw new Error('Game room not found');
        } else if (!user) {
            throw new Error('User not found');
        } else if (!gameRoom.isInRoom(userId)) {
            throw new Error('User is not in the room');
        }

        gameRoom.spectators = gameRoom.spectators.filter((id) => id !== userId);
    }

    delete(roomId: string) {
        if (!this.rooms.has(roomId)) {
            throw new Error('Room not found');
        }
        const room = this.rooms.get(roomId);

        this.rooms.delete(roomId);
        this.userToRoom.delete(room.leftPlayerId);
        this.userToRoom.delete(room.rightPlayerId);
        for (const spectator of room.spectators) {
            this.userToRoom.delete(spectator);
        }
    }

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
        if (this.gameUserService.verify(leftPlayerId) == false) return false;
        if (rightPlayerId && this.gameUserService.verify(rightPlayerId)) return false;
        return true;
    }
}
