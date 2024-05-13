import { Controller, Delete, Get, HttpException, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { GameUserService } from '../../services/game-user/game-user.service';
import { SerializedGameUser } from '../../entities/game-user';
import { CreateGameUserDto } from '../../dtos/gameUser/create-game-user.dto';

@Controller('game-user')
export class GameUserController {
    constructor(private gameUserService: GameUserService) {}

    @Get()
    findAll(): SerializedGameUser[] {
        return this.gameUserService.findAll();
    }

    /**
     * @attention Why do I have to give an access?
     */
    // @Get(':id')
    // findOne(): string {
    //     return this.gameUserService.findOneById();
    // }

    @Post()
    @UsePipes(ValidationPipe)
    create(dto: CreateGameUserDto): string {
        try {
            return this.gameUserService.create(dto);
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }

    @Put(':id')
    update(): string {
        return this.gameUserService.update();
    }

    @Delete(':id')
    remove(@Param('id') id: string ): string {
        try {
            return this.gameUserService.remove({
                id, 
                reason: "No reason provided"
            });
        } catch (error) {
            throw new HttpException(error.message, 400);
        }
    }
}
