import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../database/prisma/prisma.service.js';
import type { HealthModel } from './models/health.model.js';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  async check(): Promise<HealthModel> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;

      return {
        status: 'ok',
        database: 'ok',
        timestamp: new Date(),
      };
    } catch {
      return {
        status: 'ok',
        database: 'unavailable',
        timestamp: new Date(),
      };
    }
  }
}
