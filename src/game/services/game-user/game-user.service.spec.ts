import { Test, TestingModule } from '@nestjs/testing';
import { GameUserService } from './game-user.service';
import { GameUser, GameUserRole } from '../../entities/game-user';
import { CreateGameUserDto } from '../../dtos/gameUser/create-game-user.dto';

describe('GameUserService', () => {
  let service: GameUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameUserService],
    }).compile();

    service = module.get<GameUserService>(GameUserService);
  });

  afterEach(() => {
    // Clear users after each test
    service['users'].clear();
    service['nameToId'].clear();
  });

  it('should create and delete 10 users', () => {
    // Create 10 users
    const users: GameUser[] = [];
    for (let i = 0; i < 10; i++) {
      const username = `user${i + 1}`;
      const newUser = service.create({ username });
      expect(newUser).toBe('User created');
      users.push(service['users'].get(service['nameToId'].get(username)));
    }

    // Check existence of each user
    for (const user of users) {
      expect(service.findOneById(user.id)).toBe(user);
    }

    // Delete each user
    for (const user of users) {
      const result = service.remove({ id: user.id, reason: 'No reason provided'});
      expect(result).toBe('User removed');
    }

    // Check that all users are deleted
    for (const user of users) {
      expect(service.findOneById(user.id)).toBeUndefined();
    }
  });

  // it('should throw an error if username already exists', () => {
  //   // Create a user with an initial username
  //   const initialUsername = 'testUser';
  //   service.create({ username: initialUsername });

  //   // Attempt to create another user with the same username
  //   const duplicateUsernameDto: CreateGameUserDto = { username: initialUsername };
  //   expect(() => service.create(duplicateUsernameDto)).toThrow('Username already exists');

  // });
});
