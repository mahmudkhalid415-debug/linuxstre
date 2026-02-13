"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Select } from "@/components/ui/select"
import { Search, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react"
import { generateMockTasks } from "@/lib/mock-data"
import { format } from "date-fns"

export default function TaskHistoryPage() {
  const allTasks = generateMockTasks(50)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [expandedTask, setExpandedTask] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredTasks = allTasks.filter((task) => {
    const matchesSearch = task.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTasks = filteredTasks.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Task History</h1>
        <p className="text-muted-foreground">
          View and analyze all completed automation tasks
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by Task ID or URL..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="md:w-48"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
              <option value="running">Running</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredTasks.length)} of {filteredTasks.length} tasks
        </p>
      </div>

      {/* Task Table */}
      <Card>
        <CardHeader>
          <CardTitle>Task Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task ID</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Execution Time</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTasks.map((task) => (
                <>
                  <TableRow
                    key={task.id}
                    className="cursor-pointer"
                    onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                  >
                    <TableCell className="font-medium">{task.id}</TableCell>
                    <TableCell className="max-w-[300px] truncate">{task.url}</TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell>{task.executionTime}ms</TableCell>
                    <TableCell>{format(task.timestamp, "MMM d, yyyy HH:mm")}</TableCell>
                    <TableCell>
                      {expandedTask === task.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </TableCell>
                  </TableRow>
                  {expandedTask === task.id && (
                    <TableRow>
                      <TableCell colSpan={6} className="bg-muted/50">
                        <div className="py-4 space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">AI Analysis Report</h4>
                            <p className="text-sm text-muted-foreground">
                              {task.aiAnalysis}
                            </p>
                          </div>
                          {task.fields && task.fields.length > 0 && (
                            <div>
                              <h4 className="font-semibold mb-2">Executed Actions</h4>
                              <div className="space-y-2">
                                {task.fields.map((field, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-4 text-sm bg-background p-2 rounded"
                                  >
                                    <Badge variant="outline">{field.action}</Badge>
                                    <code className="text-xs">{field.selector}</code>
                                    {field.value && (
                                      <span className="text-muted-foreground">
                                        → {field.value}
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
