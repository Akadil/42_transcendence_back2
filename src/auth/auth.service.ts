import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async signup(dto: SignUpDto) {
        if (this.userService.emailExists(dto.username) == true) {
            throw new BadRequestException('Email already exists');
        } else if (this.userService.usernameExists(dto.username) == true) {
            throw new BadRequestException('Username already exists');
        }

        const user = this.userService.create(dto);
        const payload = { sub: user.id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signIn(dto: SignInDto) {
        const user = await this.userService.findOneByUsername(dto.username);

        if (!user || (await bcrypt.compare(dto.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    signOut(user: any) {
        return "Do me a favor and don't come back!";
    }

    refresh(user: any) {
        return "Nope, you're still not welcome!";
    }
}
