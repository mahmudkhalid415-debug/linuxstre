import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { Breadcrumbs } from "@/components/breadcrumbs"

export const metadata: Metadata = {
  title: "Foodex Automation Engine",
  description: "AI-Powered Web Automation Dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider defaultTheme="dark" storageKey="foodex-theme">
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
              <div className="border-b border-border bg-card px-8 py-4">
                <Breadcrumbs />
              </div>
              <div className="p-8">
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
