import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GameModule } from './game/game.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.dev.env',
        }),
        // GameModule,
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
