import { Injectable, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import type { RegisterInput } from './inputs/register.input.js';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly users: UsersService) {}

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
}
