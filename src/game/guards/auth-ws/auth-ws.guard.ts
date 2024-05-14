import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GameUserService } from '../../services/game-user/game-user.service';

@Injectable()
export class AuthWsGuard implements CanActivate {
    constructor(private gameUserService: GameUserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const client = context.switchToWs().getClient();
        const token = client.handshake?.headers?.authorization;

        if (!token) {
            client.disconnect();
            return false;
        }
        const { id, username } = await this.gameUserService.verifyByToken(token);
        if (!id) {
            client.disconnect();
            return false;
        }
        if (!this.gameUserService.verify(id)) {
            client.disconnect();
            return false;
        }
        const user = {
            id: id,
            username: username,
        };
        client.user = user;
        return true;
    }
}
