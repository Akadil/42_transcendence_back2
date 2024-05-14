export class GameRoom {
    // id of the room
    id: string;

    // Left team
    // leftTeam: string[] = [];
    leftPlayerId: string;
    leftPlayerName: string;

    // Right team
    // rightTeam: string[] = [];
    rightPlayerId: string;
    rightPlayerName: string;

    // Game room status
    //

    // Spectators
    spectators: string[] = [];

    isPlayer(userId: string): boolean {
        return this.leftPlayerId === userId || this.rightPlayerId === userId;
    }

    isSpectator(userId: string): boolean {
        return this.spectators.includes(userId);
    }

    isInRoom(userId: string): boolean {
        return this.isPlayer(userId) || this.isSpectator(userId);
    }
}
