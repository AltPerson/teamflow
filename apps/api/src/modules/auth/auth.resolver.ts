import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import type { GraphQLContext } from '../../graphql/graphql-context.type.js';
import { UserModel } from '../users/models/user.model.js';
import { AuthService } from './auth.service.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { LoginInput } from './inputs/login.input.js';
import { RegisterInput } from './inputs/register.input.js';

const FIFTEEN_MINUTES_MS = 15 * 60 * 1000;
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserModel)
  register(@Args('input') input: RegisterInput): Promise<UserModel> {
    return this.authService.register(input);
  }

  @Mutation(() => UserModel)
  async login(
    @Args('input') input: LoginInput,
    @Context() context: GraphQLContext,
  ): Promise<UserModel> {
    const { user, refreshToken, expiresAt, accessToken } =
      await this.authService.login(input);

    context.res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      expires: expiresAt,
    });

    context.res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: FIFTEEN_MINUTES_MS,
    });

    return user;
  }

  @Query(() => UserModel)
  @UseGuards(JwtAuthGuard)
  async me(@Context() context: GraphQLContext): Promise<UserModel> {
    const userId = context.req.user?.sub;

    if (!userId) {
      throw new UnauthorizedException();
    }

    const user = await this.authService.me(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
