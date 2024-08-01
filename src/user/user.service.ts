import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CreateUser } from './interface/create-user.interface';

@Injectable()
export class UserService {
    /* ************************* Class attributes *************************** */
    private static id = 2;
    private fakeUsers: User[] = [
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

    /* ************************* CRUD methods  ****************************** */
    create(data: CreateUser) {
        const newUser = {
            id: UserService.id++,
            ...data,
            createdAt: new Date(),
        };
        this.fakeUsers.push(newUser);
        return newUser;
    }

    async findOneById(id: string): Promise<User | undefined> {
        return await this.fakeUsers.find((user) => user.id === id);
    }

    async findOneByUsername(username: string): Promise<User | undefined> {
        return await this.fakeUsers.find((user) => user.username === username);
    }

    remove(id: number) {
        if (this.fakeUsers.find((user) => user.id === id)) {
            this.fakeUsers = this.fakeUsers.filter((user) => user.id !== id);
        }
    }

    /* ************************* Class helpers *************************** */
    usernameExists(username: string): boolean {
        return this.fakeUsers.some((user) => user.username === username);
    }

    emailExists(email: string): boolean {
        return this.fakeUsers.some((user) => user.email === email);
    }
}
