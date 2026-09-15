import type { Request, Response } from 'express';

import type { AccessTokenPayload } from '../modules/auth/types/access-token-payload.type.js';

export type AuthenticatedRequest = Request & {
  user?: AccessTokenPayload;
};

export type GraphQLContext = {
  req: AuthenticatedRequest;
  res: Response;
};
