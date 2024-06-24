import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CreateUser } from './interface/create-user.interface';

@Injectable()
export class UserService {
    static id = 2;
    fakeUsers: User[] = [
        {
            id: 0,
            username: 'john',
            email: 'john@gmail.com',
            password: 'changeme',
            createdAt: new Date(),
        },
        {
            id: 1,
            username: 'chris',
            email: 'chris@gmail.com',
            password: 'changeme',
            createdAt: new Date(),
        },
    ];

    create(data: CreateUser) {
        const newUser = {
            id: UserService.id++,
            ...data,
            createdAt: new Date(),
        };
        this.fakeUsers.push(newUser);
    }

    findOneById(id: number): User | undefined {
        return this.fakeUsers.find((user) => user.id === id);
    }

    findOneByUsername(username: string): User | undefined {
        return this.fakeUsers.find((user) => user.username === username);
    }

    remove(id: number) {
        if (this.fakeUsers.find((user) => user.id === id)) {
            this.fakeUsers = this.fakeUsers.filter((user) => user.id !== id);
        }
    }
}
