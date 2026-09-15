import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service.js';

type CreateSessionData = {
  userId: string;
  refreshTokenHash: string;
  userAgent?: string;
  ipAddress?: string;
  expiresAt: Date;
};

@Injectable()
export class SessionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateSessionData) {
    return this.prisma.session.create({
      data,
    });
  }
}
