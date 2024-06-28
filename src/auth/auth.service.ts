import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    // user.id -> refresh_token
    refresh_tokens = new Map<string, string>();

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async signup(dto: SignUpDto) {
        if (this.userService.emailExists(dto.username) == true) {
            throw new ForbiddenException('Email already exists');
        } else if (this.userService.usernameExists(dto.username) == true) {
            throw new ForbiddenException('Username already exists');
        }

        const user = this.userService.create(dto);
        const payload = { sub: user.id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload, {
                expiresIn: '15m',
            }),
            refresh_token: await this.jwtService.signAsync(payload, {
                expiresIn: '2d',
            }),
        };
    }

    async signIn(dto: SignInDto) {
        const user = await this.userService.findOneByUsername(dto.username);

        if (!user || (await bcrypt.compare(dto.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload, {
                expiresIn: '15m',
            }),
            refresh_token: await this.jwtService.signAsync(payload, {
                expiresIn: '2d',
            }),
        };
    }

    signOut(user: any) {
        // Remove the token from cookies in the front
        return "Do me a favor and don't come back!";
    }

    async refresh(refreshToken: string): Promise<string> {
        // Get the user from the refresh token
        let payload: any;
        try {
            payload = await this.jwtService.verifyAsync(refreshToken, {
                secret: process.env.secret,
            });
        } catch {
            throw new UnauthorizedException('Invalid token');
        }

        // Check if the refresh token is valid
        // const storedToken = this.refresh_tokens.get(payload.sub);
        // if (storedToken !== refreshToken) {
        //     throw new UnauthorizedException('Invalid token');
        // }

        // Generate a new access token
        const accessToken = await this.jwtService.signAsync(
            {
                sub: payload.sub,
                username: payload.username,
            },
            {
                expiresIn: '15m',
            },
        );
        return accessToken;
    }
}
