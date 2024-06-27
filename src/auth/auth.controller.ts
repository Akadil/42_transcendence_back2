import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';
import { SignUpDto } from './dto/signUp.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    async signup(@Body() signupDto: SignUpDto) {
        return this.authService.signup(signupDto);
    }

    @Post('login')
    async signin(@Body() signinDto: SignInDto) {
        return await this.authService.signIn(signinDto);
    }

    /**
     * @attention the request type is any because the guard adds the user
     */
    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async signOut(@Request() request: any) {
        return this.authService.signOut(request.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() request: any) {
        return request.user;
    }
}
