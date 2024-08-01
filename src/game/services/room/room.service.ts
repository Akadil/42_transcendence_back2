import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateRoomDto } from 'src/game/dtos/createRoom.dto';
import { Room } from 'src/game/entities/Room';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RoomService {
    private rooms: Room[] = [];

    constructor(
        private eventEmitter: EventEmitter2,
        private userService: UserService
    ) {}

    /**
     * @todo Check if user verification sends proper Error
     */
    create(dto: CreateRoomDto) {
        console.log('Creating room...');
        
        const user1 = this.userService.findOneById(dto.playerOneId);
        const user2 = this.userService.findOneById(dto.playerTwoId);
        if (!user1 || !user2) {
            throw new Error('User not found');
        }

        
    }

    getAll() {
        console.log('Getting all rooms...');
    }

    delete(id: string) {
        console.log('Deleting room...');
    }

    update(id: string) {
        console.log('Updating room...');
    }
}
