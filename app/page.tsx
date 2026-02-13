"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import {
  Activity,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  TrendingUp,
  AlertCircle,
} from "lucide-react"
import { getDashboardMetrics, generateMockTasks, getAnalyticsData } from "@/lib/mock-data"

export default function DashboardPage() {
  const metrics = getDashboardMetrics()
  const recentTasks = generateMockTasks(10)
  const analyticsData = getAnalyticsData()

  const metricCards = [
    {
      title: "Total Tasks Run",
      value: metrics.totalTasks.toLocaleString(),
      icon: Activity,
      trend: "+12.5%",
      trendUp: true,
    },
    {
      title: "Success Rate",
      value: `${metrics.successRate}%`,
      icon: CheckCircle2,
      trend: "+5.2%",
      trendUp: true,
    },
    {
      title: "Average Speed",
      value: `${metrics.avgSpeed}ms`,
      icon: Clock,
      trend: "-8.3%",
      trendUp: true,
    },
    {
      title: "Active Workers",
      value: metrics.activeWorkers.toString(),
      icon: Users,
      trend: "+2",
      trendUp: true,
    },
    {
      title: "Failed Tasks",
      value: metrics.failedTasks.toString(),
      icon: XCircle,
      trend: "-3.1%",
      trendUp: true,
    },
  ]

  const successVsFailed = [
    { name: "Success", value: metrics.totalTasks - metrics.failedTasks, color: "#10b981" },
    { name: "Failed", value: metrics.failedTasks, color: "#ef4444" },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to Foodex Automation Engine</h1>
        <p className="text-blue-100">
          AI-powered web automation with ultra-fast execution and intelligent error detection
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {metricCards.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className={`h-3 w-3 ${metric.trendUp ? "text-green-500" : "text-red-500"}`} />
                <span className={metric.trendUp ? "text-green-500" : "text-red-500"}>
                  {metric.trend}
                </span>
                <span>from last week</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Tasks Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Tasks Over Time (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.tasksOverTime}>
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
                  dataKey="success"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Success"
                />
                <Line
                  type="monotone"
                  dataKey="failed"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Failed"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Success vs Failed */}
        <Card>
          <CardHeader>
            <CardTitle>Success vs Failed Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={successVsFailed}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {successVsFailed.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Average Speed Per Day */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Average Execution Speed Per Day</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.speedOverTime}>
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
                <Bar dataKey="avgSpeed" fill="#3b82f6" name="Avg Speed (ms)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    {task.status === "success" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : task.status === "failed" ? (
                      <XCircle className="h-5 w-5 text-red-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{task.id}</p>
                    <p className="text-sm text-muted-foreground truncate max-w-[300px]">
                      {task.url}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge
                    variant={
                      task.status === "success"
                        ? "success"
                        : task.status === "failed"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {task.status === "success" ? "✅ Success" : task.status === "failed" ? "❌ Failed" : "🔄 Running"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {task.executionTime}ms
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {task.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
