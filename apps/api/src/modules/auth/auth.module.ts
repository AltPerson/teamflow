import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module.js';
import { AuthService } from './auth.service.js';
import { AuthResolver } from './auth.resolver.js';
import { SessionsModule } from '../sessions/sessions.module.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

@Module({
  imports: [
    UsersModule,
    SessionsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: '15m',
        },
      }),
    }),
  ],
  providers: [AuthService, AuthResolver, JwtAuthGuard],
})
export class AuthModule {}
