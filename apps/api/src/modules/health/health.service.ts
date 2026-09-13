import { Injectable } from '@nestjs/common';

import { HealthModel } from './models/health.model.js';

@Injectable()
export class HealthService {
  check(): HealthModel {
    return {
      status: 'ok',
      timestamp: new Date(),
    };
  }
}
