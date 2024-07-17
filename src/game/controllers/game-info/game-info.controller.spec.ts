import { Test, TestingModule } from '@nestjs/testing';
import { GameInfoController } from './game-info.controller';

describe('GameInfoController', () => {
  let controller: GameInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameInfoController],
    }).compile();

    controller = module.get<GameInfoController>(GameInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
