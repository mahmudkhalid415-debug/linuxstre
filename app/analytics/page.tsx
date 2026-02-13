"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, TrendingDown, Clock, AlertCircle } from "lucide-react"
import { getAnalyticsData, generateMockTasks, generateMockErrors } from "@/lib/mock-data"

export default function AnalyticsPage() {
  const analyticsData = getAnalyticsData()
  const allTasks = generateMockTasks(100)
  const allErrors = generateMockErrors(30)

  // Calculate success rate over time
  const successRateData = analyticsData.tasksOverTime.map((day) => ({
    date: day.date,
    successRate: ((day.success / (day.success + day.failed)) * 100).toFixed(1),
  }))

  // Top 10 slowest tasks
  const slowestTasks = [...allTasks]
    .sort((a, b) => b.executionTime - a.executionTime)
    .slice(0, 10)

  // Error type counts
  const errorCounts = allErrors.reduce((acc: Record<string, number>, error) => {
    acc[error.errorType] = (acc[error.errorType] || 0) + 1
    return acc
  }, {})

  const topErrors = Object.entries(errorCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([type, count]) => ({ type, count }))

  // Tasks per hour
  const tasksPerHour = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    tasks: Math.floor(Math.random() * 30) + 5,
  }))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics</h1>
        <p className="text-muted-foreground">
          Comprehensive insights into automation performance
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.5%</div>
            <p className="text-xs text-green-500">+2.3% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Speed</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,243ms</div>
            <p className="text-xs text-green-500">-127ms faster</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allTasks.length}</div>
            <p className="text-xs text-green-500">+15 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5%</div>
            <p className="text-xs text-green-500">-1.2% improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Success Rate Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Success Rate Over Time</CardTitle>
            <CardDescription>Daily success rate percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={successRateData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="successRate"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Success Rate (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Average Speed Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Average Speed Over Time</CardTitle>
            <CardDescription>Daily average execution speed</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.speedOverTime}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="avgSpeed"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Avg Speed (ms)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tasks Per Hour */}
        <Card>
          <CardHeader>
            <CardTitle>Tasks Per Hour</CardTitle>
            <CardDescription>Task distribution by hour of day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tasksPerHour}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="hour" className="text-xs" angle={-45} textAnchor="end" height={60} />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="tasks" fill="#8b5cf6" name="Tasks" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Error Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Error Type Distribution</CardTitle>
            <CardDescription>Breakdown of error types</CardDescription>
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
      </div>

      {/* Top Lists */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top 10 Slowest Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Top 10 Slowest Tasks</CardTitle>
            <CardDescription>Tasks with highest execution time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {slowestTasks.map((task, index) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-muted-foreground">
                      #{index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-sm">{task.id}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {task.url}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {task.executionTime}ms
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top 10 Most Common Errors */}
        <Card>
          <CardHeader>
            <CardTitle>Top 10 Most Common Errors</CardTitle>
            <CardDescription>Error types by frequency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topErrors.map((error, index) => (
                <div
                  key={error.type}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-muted-foreground">
                      #{index + 1}
                    </span>
                    <p className="font-medium text-sm">
                      {error.type.replace(/_/g, " ")}
                    </p>
                  </div>
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {error.count} occurrences
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
