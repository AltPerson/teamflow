import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserModel } from '../users/models/user.model.js';
import { AuthService } from './auth.service.js';
import { RegisterInput } from './inputs/register.input.js';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserModel)
  register(@Args('input') input: RegisterInput): Promise<UserModel> {
    return this.authService.register(input);
  }
}
