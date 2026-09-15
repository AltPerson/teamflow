import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserModel } from '../users/models/user.model.js';
import { AuthService } from './auth.service.js';
import { LoginInput } from './inputs/login.input.js';
import { RegisterInput } from './inputs/register.input.js';
import type { GraphQLContext } from '../../app.module.js';

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
}
