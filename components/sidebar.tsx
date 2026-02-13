"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Play,
  History,
  AlertTriangle,
  BarChart3,
  Settings,
  Zap,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Run Automation", href: "/run", icon: Play },
  { name: "Task History", href: "/history", icon: History },
  { name: "Error Center", href: "/errors", icon: AlertTriangle },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <Zap className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold text-foreground">Foodex</span>
          <span className="text-xs text-muted-foreground">Automation Engine</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <User className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">Admin User</span>
              <span className="text-xs text-muted-foreground">admin@foodex.ai</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
