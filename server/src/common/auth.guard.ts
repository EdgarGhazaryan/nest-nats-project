import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (req.headers.authorization != process.env.LOG_LEVEL_CHANGE_TOKEN) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
