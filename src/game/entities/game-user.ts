export enum GameUserRole {
    PLAYER = 'player',
    ADMIN = 'admin',
}

export class GameUser {
    id: string;
    username: string;
    email: string = '';
    role: GameUserRole = GameUserRole.PLAYER;
}

export class SerializedGameUser {
    username: string;
    role: GameUserRole;
}
