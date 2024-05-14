import { IsNotEmpty, IsNumberString } from 'class-validator';

export class joinGameRoomDto {
    @IsNotEmpty()
    playerId: string;

    @IsNotEmpty()
    @IsNumberString()
    roomId: string;
}
