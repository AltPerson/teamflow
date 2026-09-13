import { Query, Resolver } from '@nestjs/graphql';

import { HealthService } from './health.service.js';
import { HealthModel } from './models/health.model.js';

@Resolver(() => HealthModel)
export class HealthResolver {
  constructor(private readonly healthService: HealthService) {}

  @Query(() => HealthModel, {
    name: 'health',
  })
  health(): Promise<HealthModel> {
    return this.healthService.check();
  }
}
