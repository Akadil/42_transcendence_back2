import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GameUserService } from '../../services/game-user/game-user.service';

@Injectable()
export class AuthWsGuard implements CanActivate {
    constructor(private gameUserService: GameUserService) { }
    
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const client = context.switchToWs().getClient();
        const token = client.handshake?.headers?.authorization;

        if (!token) {
            client.disconnect();
            return false;
        }
        const id = this.gameUserService.verifyByToken(token);
        if (!id) {
            client.disconnect();
            return false;
        }
        client.id = id;
        return true;
    }
}
