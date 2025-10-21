export const componentStyles = {
  // Button Styles
  button: {
    base: "inline-flex items-center justify-center font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
    sizes: {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-base",
      lg: "h-12 px-6 text-base",
    },
    variants: {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-secondary",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
      ghost: "hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
      danger: "bg-danger text-white hover:bg-danger/90 focus-visible:ring-danger",
      success: "bg-success text-white hover:bg-success/90 focus-visible:ring-success",
    },
  },

  // Input Styles
  input: {
    base: "flex w-full rounded-md border border-input bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
    sizes: {
      sm: "h-8 px-2 text-sm",
      md: "h-10 px-3 text-base",
      lg: "h-12 px-4 text-base",
    },
  },

  // Card Styles
  card: {
    base: "rounded-lg border border-border bg-card text-card-foreground shadow-sm",
    padding: {
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    },
  },

  // Badge Styles
  badge: {
    base: "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    variants: {
      default: "border border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
      secondary: "border border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive: "border border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      outline: "text-foreground border border-border",
      success: "border border-transparent bg-success text-white hover:bg-success/80",
      warning: "border border-transparent bg-warning text-white hover:bg-warning/80",
    },
  },

  // Dialog/Modal Styles
  dialog: {
    overlay: "fixed inset-0 z-50 bg-black/50 transition-opacity",
    content:
      "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-card p-6 shadow-lg",
  },

  // Popover Styles
  popover: {
    content: "rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md",
  },

  // Table Styles
  table: {
    base: "w-full border-collapse",
    header: "border-b border-border bg-muted/50",
    cell: "px-4 py-3 text-left align-middle",
    row: "border-b border-border hover:bg-muted/50 transition-colors",
  },

  // Form Styles
  form: {
    group: "space-y-2",
    label: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    error: "text-xs font-medium text-danger",
    hint: "text-xs text-muted-foreground",
  },
}
