"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export function Breadcrumbs() {
  const pathname = usePathname()
  
  const pathSegments = pathname.split("/").filter(Boolean)
  
  const breadcrumbs = [
    { name: "Home", href: "/" },
    ...pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/")
      const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
      return { name, href }
    }),
  ]

  if (pathname === "/") {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Home className="h-4 w-4" />
        <span className="font-medium text-foreground">Dashboard</span>
      </div>
    )
  }

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="h-4 w-4" />}
          {index === breadcrumbs.length - 1 ? (
            <span className="font-medium text-foreground">{breadcrumb.name}</span>
          ) : (
            <Link
              href={breadcrumb.href}
              className="hover:text-foreground transition-colors"
            >
              {breadcrumb.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}
