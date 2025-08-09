'use client';

import {useState} from "react";
import {QueryClientProvider} from "@tanstack/react-query";
import {getQueryClient, getTrpcClient} from "./trpc-utils";
import {BaseTRPCProvider} from "./trpc-context";

export function TRPCProvider({ children }: React.PropsWithChildren) {
  const [queryClient] = useState(() => getQueryClient());
  const [trpcClient] = useState(() => getTrpcClient());

  return (
    <QueryClientProvider client={queryClient}>
      <BaseTRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </BaseTRPCProvider>
    </QueryClientProvider>
  )
}