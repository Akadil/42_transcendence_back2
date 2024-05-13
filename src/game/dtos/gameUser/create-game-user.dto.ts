import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateGameUserDto {
    @IsNotEmpty()
    @MinLength(5)
    username: string;
}
