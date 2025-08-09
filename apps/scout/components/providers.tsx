'use client';

import { TRPCProvider } from '@spike/client/providers';
import { SidebarInset, SidebarProvider } from '@spike/ui/sidebar';
import { Toaster } from '@spike/ui/sonner';
import { ThemeProvider } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <TRPCProvider>
      <ThemeProvider
        attribute={'class'}
        enableSystem
        disableTransitionOnChange
        defaultTheme={'dark'}
        enableColorScheme={false}
      >
        <NuqsAdapter>
          <Toaster richColors={true} position={'top-center'} />
          <SidebarInset>{children}</SidebarInset>
        </NuqsAdapter>
      </ThemeProvider>
    </TRPCProvider>
  );
}
