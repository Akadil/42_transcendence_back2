import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthWsGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
		const client = context.switchToWs().getClient();
		const token = client.handshake?.headers?.authorization;

		if (!token) {
			client.disconnect();
			return false;
		}
		return true;
	}
}
