import { Module } from '@nestjs/common';

import { HealthResolver } from './health.resolver.js';
import { HealthService } from './health.service.js';
import { PrismaModule } from '../../database/prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  providers: [HealthResolver, HealthService],
})
export class HealthModule {}
