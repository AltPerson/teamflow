import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service.js';
import type { LoginInput } from './inputs/login.input.js';
import type { RegisterInput } from './inputs/register.input.js';
import { SessionsService } from '../sessions/sessions.service.js';
import { createHash, randomBytes } from 'node:crypto';
import { JwtService } from '@nestjs/jwt';

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly sessions: SessionsService,
    private readonly jwtService: JwtService,
  ) {}

  async register(input: RegisterInput) {
    const email = input.email.trim().toLowerCase();

    const existingUser = await this.users.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const passwordHash = await argon2.hash(input.password);

    const displayName = input.displayName.trim();

    return this.users.create({
      email,
      passwordHash,
      displayName,
    });
  }

  async login(input: LoginInput) {
    const email = input.email.trim().toLowerCase();

    const existingUser = await this.users.findByEmail(email);

    if (!existingUser) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await argon2.verify(
      existingUser.passwordHash,
      input.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const refreshToken = randomBytes(64).toString('hex');

    const refreshTokenHash = createHash('sha256')
      .update(refreshToken)
      .digest('hex');

    const expiresAt = new Date(Date.now() + THIRTY_DAYS_MS);

    const session = await this.sessions.create({
      expiresAt,
      refreshTokenHash,
      userId: existingUser.id,
    });

    const accessToken = await this.jwtService.signAsync({
      sub: existingUser.id,
      sessionId: session.id,
    });

    return {
      user: existingUser,
      refreshToken,
      expiresAt,
      accessToken,
    };
  }

  me(userId: string) {
    return this.users.findById(userId);
  }
}
