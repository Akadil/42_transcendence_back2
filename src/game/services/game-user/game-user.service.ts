import { Injectable } from '@nestjs/common';
import { GameUser, SerializedGameUser } from '../../entities/game-user';
import { CreateGameUser } from '../../dtos/gameUser/create-game-user.interface';
import { DeleteGameUser } from '../../dtos/gameUser/delete-game-user.interface';
// import { GameUser, GameUserRole, SerializedGameUser } from 'src/game/entities/game-user';
// import { CreateGameUser } from 'src/game/interfaces/create-game-user/create-game-user.interface';
// import { DeleteGameUser } from 'src/game/interfaces/delete-game-user/delete-game-user.interface';

/**
 * Service responsible for handling GameUser entity
 *
 * @details The users is not saved in database but in memory, because it is current users of a game
 */
@Injectable()
export class GameUserService {
    users: Map<string, GameUser> = new Map();
    nameToId: Map<string, string> = new Map();

    constructor() {}

    /**
     * Retrieve all users in the game
     *
     * @attention Not efficient, should be optimized ?
     */
    findAll(): SerializedGameUser[] {
        const serializedUsers: SerializedGameUser[] = [];

        for (const user of this.users.values()) {
            const serializedUser = this.serializeGameUser(user);
            serializedUsers.push(serializedUser);
        }
        return serializedUsers;
    }

    /**
     * Retrieve a user by its id
     *
     * @details If the user is not found, return null
     */
    findOneById(id: string): GameUser {
        return this.users.get(id);
    }

    /**
     * Create a new user
     */
    create(dto: CreateGameUser): string {
        if (this.nameToId[dto.username]) {
            throw new Error('Username already exists');
        }

        // Create a new user
        const { username } = dto;
        const newUser = new GameUser();
        newUser.id = this.generateId();
        newUser.username = username;

        // Save it in memory
        this.users.set(newUser.id.toString(), newUser);
        this.nameToId.set(username, newUser.id);

        return "User created";
    }

    update(): string {
        return 'This action updates a user';
    }

    remove(dto: DeleteGameUser): string {
        const { id, reason } = dto;
        const user = this.users.get(id);

        if (!user) {
            throw new Error('User not found');
        }
        this.nameToId.delete(user.username);
        this.users.delete(id);
        return 'User removed';
    }

    /* ********************************************************************** */
    /* Helper functions ***************************************************** */
    /* ********************************************************************** */
    serializeGameUser(user: GameUser): SerializedGameUser {
        const { username, role } = user;
        return { username, role };
    }

    /**
     * Generate a random id for a user
     */
    generateId(): string {
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let randomId = '';
        let extremeCase = 100;

        while (randomId == '' || this.users.has(randomId)) {
            for (let i = 0; i < 10; i++) {
                randomId += characters.charAt(
                    Math.floor(Math.random() * charactersLength),
                );
            }
            if (--extremeCase === 0) {
                throw new Error('Cannot generate random id');
            }
        }
        return randomId;
    }
}
