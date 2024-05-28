import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { PracticeModule } from './practice/practice.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.dev.env',
        }),
        GameModule,
        PracticeModule,
        UserModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
