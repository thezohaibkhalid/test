"use client"

import { useTheme } from "@/lib/theme-provider"
import { Moon, Sun } from "lucide-react"
import { DSButton } from "./ds-button"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <DSButton
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </DSButton>
  )
}
