import { Test, TestingModule } from '@nestjs/testing';
import { GameInterractionGateway } from './game-interraction.gateway';

describe('GameInterractionGateway', () => {
    let gateway: GameInterractionGateway;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GameInterractionGateway],
        }).compile();

        gateway = module.get<GameInterractionGateway>(GameInterractionGateway);
    });

    it('should be defined', () => {
        expect(gateway).toBeDefined();
    });
});
