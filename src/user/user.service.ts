import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    private readonly fakeUsers: User[] = [
        {
            id: 1,
            username: 'john',
            email: 'john@gmail.com',
            password: 'changeme',
        },
        {
            id: 2,
            username: 'chris',
            email: 'chris@gmail.com',
            password: 'changeme',
        },
    ];

    create(createUserDto: CreateUserDto) {
        console.log('createUserDto', createUserDto);
        return 'This action adds a new user';
    }

    findAll() {
        return `This action returns all user`;
    }

    async findOneById(id: number): Promise<User | undefined> {
        const user = this.fakeUsers.find((user) => user.id === id);
        return user;
    }

    async findOneByUsername(username: string): Promise<User | undefined> {
        const user = this.fakeUsers.find((user) => user.username === username);
        return user;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        console.log('updateUserDto', updateUserDto);
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
