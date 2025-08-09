'use client';

import { createTRPCContext } from '@trpc/tanstack-react-query';
import { AppRouter } from '@spike/api';

export const {
  TRPCProvider: BaseTRPCProvider,
  useTRPC,
  useTRPCClient,
} = createTRPCContext<AppRouter>();
