import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';
import { SignUpDto } from './dto/signUp.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    async signup(
        @Body() signupDto: SignUpDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<any> {
        const result = await this.authService.signup(signupDto);
        response.cookie('access_token', result.access_token, {
            httpOnly: true,
        });
        response.cookie('refresh_token', result.refresh_token, {
            httpOnly: true,
        });
    }

    @Post('login')
    async signin(
        @Body() signinDto: SignInDto,
        @Res({ passthrough: true }) response: Response,
    ) {
        const result = await this.authService.signIn(signinDto);

        response.cookie('access_token', result.access_token, {
            httpOnly: true,
        });
        response.cookie('refresh_token', result.refresh_token, {
            httpOnly: true,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async signOut(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
    ) {
        response.clearCookie('access_token', { httpOnly: true });
        response.clearCookie('refresh_token', { httpOnly: true });
        return this.authService.signOut(request.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() request: Request) {
        return request.user;
    }

    @Get('refresh')
    async refresh(
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response,
    ) {
        const refreshToken = request.cookies.refresh_token;
        if (!refreshToken) {
            throw new UnauthorizedException('No refresh token found');
        }

        const access_token = await this.authService.refresh(refreshToken);

        response.cookie('access_token', access_token, {
            httpOnly: true,
        });
    }
}
