import { AppRouter } from '@spike/api';
import { QueryClient } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';

export function getQueryClient() {
  if (typeof window === 'undefined') {
    return new QueryClient();
  }
  if (!(globalThis as any)._queryClient) {
    (globalThis as any)._queryClient = new QueryClient();
  }
  return (globalThis as any)._queryClient;
}

export function getTrpcClient() {
  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: '/api/trpc',
        headers: () => {
          const token = localStorage.getItem('bearer');
          return token ? { authorization: `Bearer ${token}` } : {};
        },
      }),
    ],
  });
}
