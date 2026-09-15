import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { GraphQLContext } from '../../../graphql/graphql-context.type.js';

type AccessTokenPayload = {
  sub: string;
  sessionId: string;
};

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);

    const request = gqlContext.getContext<GraphQLContext>().req;

    const { cookies } = request;

    const { accessToken } = cookies ?? {};

    if (!accessToken) {
      throw new UnauthorizedException('No token');
    }

    try {
      const payload =
        await this.jwtService.verifyAsync<AccessTokenPayload>(accessToken);

      request.user = payload;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
