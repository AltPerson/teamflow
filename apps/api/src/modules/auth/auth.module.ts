import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module.js';
import { AuthService } from './auth.service.js';
import { AuthResolver } from './auth.resolver.js';

@Module({
  imports: [UsersModule],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
