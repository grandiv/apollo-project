"use client";
// Providers are used to provide theme for the app. Ex: dark theme
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();
export function Provider({ children, ...props }: ThemeProviderProps) {
  return (
    // Query Client Provider is used to cache the result from previous endpoint hitting (efficiency, bandwidth saving)
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        {...props}
      >
        {/* SessionProvider is used to get the user data from the session. Used in SubscriptionAction */}
        <SessionProvider>{children}</SessionProvider>
      </NextThemesProvider>
    </QueryClientProvider>
  );
}
