import { Test, TestingModule } from '@nestjs/testing';
import { GameInterractionService } from './game-interraction.service';

describe('GameInterractionService', () => {
    let service: GameInterractionService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GameInterractionService],
        }).compile();

        service = module.get<GameInterractionService>(GameInterractionService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
