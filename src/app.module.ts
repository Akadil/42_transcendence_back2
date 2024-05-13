import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { PracticeModule } from './practice/practice.module';

@Module({
    imports: [GameModule, PracticeModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
