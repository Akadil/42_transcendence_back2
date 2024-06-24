import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { CreateUser } from './interface/create-user.interface';

describe('UserService', () => {
    let service: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        const initialLength = service.fakeUsers.length;
        const createUser: CreateUser = {
            username: 'alice',
            email: 'alice@gmail.com',
            password: 'password123',
        };

        service.create(createUser);
        const newLength = service['fakeUsers'].length;
        const newUser = service['fakeUsers'][newLength - 1];

        expect(newLength).toBe(initialLength + 1);
        expect(newUser).toBeDefined();
        expect(newUser.id).toBe(UserService.id - 1); // because id increments after assignment
        expect(newUser.username).toBe(createUser.username);
        expect(newUser.email).toBe(createUser.email);
        expect(newUser.password).toBe(createUser.password);
        expect(newUser.createdAt).toBeInstanceOf(Date);
    });

    describe('findOneById', () => {
        it('should find a user by ID', () => {
            const user = service.findOneById(0);
            expect(user).toBeDefined();
            expect(user?.id).toBe(0);
            expect(user?.username).toBe('john');
        });

        it('should return undefined if user is not found', () => {
            const user = service.findOneById(999);
            expect(user).toBeUndefined();
        });
    });

    describe('findOneByUsername', () => {
        it('should find a user by username', () => {
            const user = service.findOneByUsername('chris');
            expect(user).toBeDefined();
            expect(user?.username).toBe('chris');
        });

        it('should return undefined if user is not found', () => {
            const user = service.findOneByUsername('unknown');
            expect(user).toBeUndefined();
        });
    });

    describe('remove', () => {
        it('should remove a user by ID', () => {
            service.remove(0);
            const user = service.findOneById(0);
            expect(user).toBeUndefined();
        });

        it('should do nothing if user is not found', () => {
            const initialLength = service['fakeUsers'].length;
            service.remove(999);
            const finalLength = service['fakeUsers'].length;
            expect(finalLength).toBe(initialLength);
        });
    });
});
