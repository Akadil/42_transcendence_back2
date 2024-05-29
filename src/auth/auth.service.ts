import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async signIn(dto: SignInDto) {
        const user = await this.userService.findOneByUsername(dto.username);

        if (!user || user.password !== dto.password) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = {
            sub: user.id,
            username: user.username,
        };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async validate_user(username: string, password: string): Promise<any> {
        const user = await this.userService.findOneByUsername(username);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
