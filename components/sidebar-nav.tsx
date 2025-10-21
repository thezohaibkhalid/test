"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import {
  LayoutDashboard,
  ShoppingCart,
  UtensilsCrossed,
  Tag,
  ImageIcon,
  Users,
  Star,
  Mail,
  Bike,
  Store,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  Ticket,
  Package,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
} from "lucide-react"

type ItemIconType = React.ComponentType<React.SVGProps<SVGSVGElement>>

interface NavItem {
  label: string
  href: string
  icon: ItemIconType
  children?: NavItem[]
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Menu", href: "/admin/menu", icon: UtensilsCrossed },
  { label: "Promotions", href: "/admin/promotions", icon: Tag },
  { label: "Banners", href: "/admin/banners", icon: ImageIcon },
  { label: "Coupons", href: "/admin/coupons", icon: Ticket },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Reviews", href: "/admin/reviews", icon: Star },
  { label: "Campaigns", href: "/admin/campaigns", icon: Mail },
  { label: "Riders", href: "/admin/riders", icon: Bike },
  { label: "Frontdesk", href: "/admin/frontdesk", icon: Store },
  { label: "Branches", href: "/admin/branches", icon: Store },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Meta Ads", href: "/admin/meta-ads", icon: BarChart3 },
  { label: "Reports", href: "/admin/reports", icon: BarChart3 },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
    children: [
      { label: "General", href: "/admin/settings", icon: Settings },
      { label: "Billing", href: "/admin/settings/billing", icon: CreditCard },
    ],
  },
]

export function SidebarNav() {
  const pathname = usePathname()
  const router = useRouter()
  const user = useSelector((s: RootState) => s.auth.user)

  // collapse / groups / flyout
  const [collapsed, setCollapsed] = React.useState<boolean>(false)
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>({ Settings: true })
  const [flyoutOpenFor, setFlyoutOpenFor] = React.useState<string | null>(null)

  const isActive = React.useCallback(
    (href: string) => (href === "/admin/dashboard" ? pathname === href : pathname.startsWith(href)),
    [pathname]
  )

  const toggleGroup = (label: string) =>
    setOpenGroups((s) => ({ ...s, [label]: !s[label] }))

  const handleLogout = () => {
    // keep your real logout flow here if needed
    router.push("/login")
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col overflow-hidden bg-card">
      {/* Header */}
      <div className="border-b px-2 transition-all duration-300">
        {collapsed ? (
          <div className="flex flex-col items-center py-2 gap-1">
            <Link href="/admin/dashboard" className="flex items-center justify-center w-full">
              <Package className="h-7 w-7 text-foreground" />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setFlyoutOpenFor(null)
                setCollapsed(false)
              }}
              aria-label="Expand sidebar"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </Button>
          </div>
        ) : (
          <div className="flex h-14 items-center justify-between lg:h-[60px] px-2">
            <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
              <Package className="h-6 w-6 text-foreground" />
              <span className="text-lg">FoodHub Admin</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setFlyoutOpenFor(null)
                setCollapsed(true)
              }}
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </Button>
          </div>
        )}
      </div>

      {/* Nav */}
      <ScrollArea className={cn("flex-1", collapsed ? "px-0 py-4" : "px-2 py-3")}>
        <TooltipProvider delayDuration={120}>
          {collapsed ? (
            // Collapsed: icons with tooltips; groups open in flyout
            <nav className="flex flex-col items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon
                if (item.children?.length) {
                  const open = flyoutOpenFor === item.label
                  return (
                    <Popover
                      key={item.label}
                      open={open}
                      onOpenChange={(v) => setFlyoutOpenFor(v ? item.label : null)}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={cn(
                            "flex h-14 w-14 items-center justify-center",
                            isActive(item.href) && "bg-primary/10 text-primary"
                          )}
                          aria-label={item.label}
                        >
                          <Icon className="h-6 w-6" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        side="right"
                        align="start"
                        className="w-60 p-2"
                        onPointerDownOutside={() => setFlyoutOpenFor(null)}
                      >
                        <div className="mb-1 px-2 text-xs font-medium text-muted-foreground">
                          {item.label}
                        </div>
                        <div className="space-y-1">
                          {item.children.map((child) => {
                            const CIcon = child.icon
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  "flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors",
                                  isActive(child.href)
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                )}
                                onClick={() => setFlyoutOpenFor(null)}
                              >
                                <CIcon className="h-4 w-4" />
                                <span>{child.label}</span>
                              </Link>
                            )
                          })}
                        </div>
                      </PopoverContent>
                    </Popover>
                  )
                }

                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>
                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "flex h-14 w-14 items-center justify-center",
                          isActive(item.href) && "bg-primary/10 text-primary"
                        )}
                        aria-label={item.label}
                      >
                        <Link href={item.href}>
                          <Icon className="h-6 w-6" />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  </Tooltip>
                )
              })}
            </nav>
          ) : (
            // Expanded: full labels; groups are collapsible
            <nav className="grid gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                if (item.children?.length) {
                  const open = openGroups[item.label] ?? true
                  return (
                    <div key={item.label} className="space-y-1">
                      <Button
                        variant="ghost"
                        className="group flex w-full items-center justify-start px-2 py-2 text-sm"
                        onClick={() => toggleGroup(item.label)}
                        aria-expanded={open}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="ml-3">{item.label}</span>
                        <ChevronDown
                          className={cn(
                            "ml-auto h-4 w-4 transition-transform",
                            open ? "rotate-0" : "-rotate-90"
                          )}
                        />
                      </Button>
                      <div
                        className={cn(
                          "overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
                          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        )}
                      >
                        <div className="pl-7">
                          {item.children.map((child) => {
                            const CIcon = child.icon
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  "group mt-1 flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors",
                                  isActive(child.href)
                                    ? "bg-primary/10 text-primary border-l-2 border-primary"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                )}
                              >
                                <CIcon className="h-4 w-4" />
                                <span>{child.label}</span>
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive(item.href)
                        ? "bg-primary/10 text-primary border-l-2 border-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          )}
        </TooltipProvider>
      </ScrollArea>

      {/* Footer */}
      <div className="mt-auto border-t p-2">
        {collapsed ? (
          <TooltipProvider delayDuration={120}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12 mx-auto"
                  onClick={handleLogout}
                  aria-label="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <div className="space-y-2">
            <div className="px-2 py-2 text-sm">
              <p className="font-medium">{user?.name ?? "—"}</p>
              <p className="text-xs text-muted-foreground">{user?.email ?? ""}</p>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={handleLogout}
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <aside
      className={cn(
        "sticky top-0 h-svh min-h-svh border-r bg-muted/40",
        "transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        collapsed ? "w-[84px]" : "w-[260px]"
      )}
    >
      <SidebarContent />
    </aside>
  )
}
