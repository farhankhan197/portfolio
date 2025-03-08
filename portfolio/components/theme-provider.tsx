"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider , ThemeProviderProps} from "next-themes"

interface customThemeProviderProps extends ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({
  children,
  ...props
}: customThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
