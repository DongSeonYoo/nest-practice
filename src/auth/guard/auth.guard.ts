import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly authServices: AuthService) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();
		const rawToken = req.headers['authorization'];

		if (!rawToken) {
			return false;
		}

		const token = this.authServices.extractTokenFromHeader(rawToken);
		const decoded = this.authServices.verifyToken(token);
		req.user = decoded;

		return true;
	}
}

@Injectable()
export class AccessTokenGuard extends AuthGuard {
	async canActivate(context: ExecutionContext): Promise<boolean> {
		await super.canActivate(context);
		const req = context.switchToHttp().getRequest();

		if (req.user.type !== 'accessToken') {
			throw new UnauthorizedException('accessToken만 가능');
		}
		return true;
	}
}