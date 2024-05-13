import { Test, TestingModule } from '@nestjs/testing';
import { GameUserController } from './game-user.controller';
import { GameUserService } from '../../services/game-user/game-user.service';

describe('GameUserController', () => {
    let controller: GameUserController;
    let service: GameUserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GameUserController],
            providers: [GameUserService],
        }).compile();

        controller = module.get<GameUserController>(GameUserController);
        service = module.get<GameUserService>(GameUserService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
