import { Injectable } from '@nestjs/common';
import { GameRoom } from '../../entities/game-room';

@Injectable()
export class GameRoomService {
    private static roomId = 0;
    private rooms: Map<string, GameRoom> = new Map<string, GameRoom>();
    
    get(id: string): GameRoom | null {
        if (this.rooms.has(id)) {
            return this.rooms.get(id);
        }
        return null;
    }

    create(): string {
        return 'This action creates a new game room';
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
}
