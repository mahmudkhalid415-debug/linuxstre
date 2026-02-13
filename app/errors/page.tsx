"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select } from "@/components/ui/select"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"
import {
  AlertTriangle,
  ShieldAlert,
  Server,
  Clock,
  Search,
  FileQuestion,
} from "lucide-react"
import { generateMockErrors, getAnalyticsData } from "@/lib/mock-data"
import { format } from "date-fns"

const errorIcons: Record<string, any> = {
  VALIDATION_ERROR: FileQuestion,
  CAPTCHA_DETECTED: ShieldAlert,
  SERVER_ERROR: Server,
  TIMEOUT_ERROR: Clock,
  SELECTOR_NOT_FOUND: Search,
  AUTHENTICATION_FAILED: AlertTriangle,
}

export default function ErrorCenterPage() {
  const allErrors = generateMockErrors(30)
  const [errorTypeFilter, setErrorTypeFilter] = useState("all")
  const analyticsData = getAnalyticsData()

  const filteredErrors = errorTypeFilter === "all"
    ? allErrors
    : allErrors.filter((error) => error.errorType === errorTypeFilter)

  const errorTypes = Array.from(new Set(allErrors.map((e) => e.errorType)))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Error Center</h1>
        <p className="text-muted-foreground">
          Analyze failed tasks and get AI-powered diagnostics
        </p>
      </div>

      {/* Error Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Errors</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allErrors.length}</div>
            <p className="text-xs text-muted-foreground">Last 7 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Common</CardTitle>
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">CAPTCHA</div>
            <p className="text-xs text-muted-foreground">35% of all errors</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3h</div>
            <p className="text-xs text-muted-foreground">From detection to fix</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Error Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Error Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.errorDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analyticsData.errorDistribution.map((entry, index) => {
                    const colors = ["#ef4444", "#f59e0b", "#3b82f6", "#8b5cf6", "#6b7280"]
                    return <Cell key={`cell-${index}`} fill={colors[index]} />
                  })}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Filter */}
        <Card>
          <CardHeader>
            <CardTitle>Filter by Error Type</CardTitle>
            <CardDescription>Select an error type to view details</CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              value={errorTypeFilter}
              onChange={(e) => setErrorTypeFilter(e.target.value)}
            >
              <option value="all">All Error Types</option>
              {errorTypes.map((type) => (
                <option key={type} value={type}>
                  {type.replace(/_/g, " ")}
                </option>
              ))}
            </Select>
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium">Showing Results</p>
              <p className="text-2xl font-bold">{filteredErrors.length} errors</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error Cards */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Error Details</h2>
        {filteredErrors.map((error) => {
          const Icon = errorIcons[error.errorType] || AlertTriangle
          return (
            <Card key={error.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                      <Icon className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle>{error.id}</CardTitle>
                        <Badge variant="destructive">{error.errorType.replace(/_/g, " ")}</Badge>
                      </div>
                      <CardDescription>
                        Task {error.taskId} • {format(error.timestamp, "MMM d, yyyy HH:mm")}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* AI Diagnosis */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-primary">🤖</span> AI Diagnosis
                  </h4>
                  <p className="text-sm text-muted-foreground">{error.diagnosis}</p>
                </div>

                {/* AI Suggestions */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="text-primary">💡</span> AI Suggestions
                  </h4>
                  <ul className="space-y-2">
                    {error.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-0.5">•</span>
                        <span className="text-muted-foreground">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Affected Fields */}
                {error.affectedFields.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Affected Fields</h4>
                    <div className="flex flex-wrap gap-2">
                      {error.affectedFields.map((field, index) => (
                        <Badge key={index} variant="outline">
                          <code className="text-xs">{field}</code>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
