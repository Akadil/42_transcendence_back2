import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
