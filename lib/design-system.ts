// Design System - Centralized theme and component configuration
// This file defines all design tokens and can be easily modified for branding changes

export const designSystem = {
  colors: {
    primary: {
      50: "oklch(0.97 0.05 262.2)",
      100: "oklch(0.94 0.1 262.2)",
      200: "oklch(0.88 0.12 262.2)",
      300: "oklch(0.81 0.14 262.2)",
      400: "oklch(0.65 0.15 262.2)",
      500: "oklch(0.55 0.16 262.2)",
      600: "oklch(0.5 0.16 262.2)", // Main primary
      700: "oklch(0.45 0.15 262.2)",
      800: "oklch(0.38 0.14 262.2)",
      900: "oklch(0.3 0.12 262.2)",
    },
    success: {
      50: "oklch(0.97 0.05 142.5)",
      100: "oklch(0.94 0.1 142.5)",
      200: "oklch(0.88 0.12 142.5)",
      300: "oklch(0.81 0.14 142.5)",
      400: "oklch(0.65 0.15 142.5)",
      500: "oklch(0.55 0.15 142.5)",
      600: "oklch(0.5 0.15 142.5)", // Main success
      700: "oklch(0.45 0.14 142.5)",
      800: "oklch(0.38 0.13 142.5)",
      900: "oklch(0.3 0.11 142.5)",
    },
    warning: {
      50: "oklch(0.97 0.05 70)",
      100: "oklch(0.94 0.1 70)",
      200: "oklch(0.88 0.12 70)",
      300: "oklch(0.81 0.14 70)",
      400: "oklch(0.65 0.15 70)",
      500: "oklch(0.6 0.15 70)",
      600: "oklch(0.6 0.15 70)", // Main warning
      700: "oklch(0.5 0.14 70)",
      800: "oklch(0.42 0.13 70)",
      900: "oklch(0.32 0.11 70)",
    },
    danger: {
      50: "oklch(0.97 0.05 25)",
      100: "oklch(0.94 0.1 25)",
      200: "oklch(0.88 0.12 25)",
      300: "oklch(0.81 0.14 25)",
      400: "oklch(0.65 0.15 25)",
      500: "oklch(0.55 0.16 25)",
      600: "oklch(0.5 0.16 25)", // Main danger
      700: "oklch(0.45 0.15 25)",
      800: "oklch(0.38 0.14 25)",
      900: "oklch(0.3 0.12 25)",
    },
    neutral: {
      50: "oklch(0.98 0.001 70)",
      100: "oklch(0.96 0.001 70)",
      200: "oklch(0.93 0.002 70)",
      300: "oklch(0.88 0.003 70)",
      400: "oklch(0.74 0.005 70)",
      500: "oklch(0.556 0 0)",
      600: "oklch(0.4 0 0)",
      700: "oklch(0.3 0 0)",
      800: "oklch(0.2 0 0)",
      900: "oklch(0.145 0 0)",
    },
  },

  // Typography
  typography: {
    fontFamily: {
      sans: '"Geist", "Geist Fallback", system-ui, sans-serif',
      mono: '"Geist Mono", "Geist Mono Fallback", monospace',
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.6,
    },
  },

  // Spacing
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "2.5rem",
    "3xl": "3rem",
  },

  // Border Radius
  borderRadius: {
    none: "0",
    sm: "0.375rem",
    md: "0.625rem",
    lg: "0.875rem",
    xl: "1.25rem",
    full: "9999px",
  },

  // Shadows
  shadows: {
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  },

  // Component Sizes
  sizes: {
    button: {
      sm: {
        height: "2rem",
        padding: "0.5rem 0.75rem",
        fontSize: "0.875rem",
      },
      md: {
        height: "2.5rem",
        padding: "0.625rem 1rem",
        fontSize: "1rem",
      },
      lg: {
        height: "3rem",
        padding: "0.75rem 1.5rem",
        fontSize: "1rem",
      },
    },
    input: {
      sm: {
        height: "2rem",
        padding: "0.5rem 0.75rem",
        fontSize: "0.875rem",
      },
      md: {
        height: "2.5rem",
        padding: "0.625rem 1rem",
        fontSize: "1rem",
      },
      lg: {
        height: "3rem",
        padding: "0.75rem 1.5rem",
        fontSize: "1rem",
      },
    },
  },

  // Transitions
  transitions: {
    fast: "150ms ease-in-out",
    base: "200ms ease-in-out",
    slow: "300ms ease-in-out",
  },
}

// Helper function to get color by name and shade
export const getColor = (colorName: keyof typeof designSystem.colors, shade: keyof typeof designSystem.colors.primary) => {
  return designSystem.colors[colorName][shade]
}

// Helper function to get spacing
export const getSpacing = (size: keyof typeof designSystem.spacing) => {
  return designSystem.spacing[size]
}

// Helper function to get border radius
export const getBorderRadius = (size: keyof typeof designSystem.borderRadius) => {
  return designSystem.borderRadius[size]
}
