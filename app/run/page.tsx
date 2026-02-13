"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Plus, Trash2, Play, Loader2 } from "lucide-react"

interface FormField {
  id: string
  selector: string
  action: string
  value: string
}

export default function RunAutomationPage() {
  const [url, setUrl] = useState("")
  const [fields, setFields] = useState<FormField[]>([
    { id: "1", selector: "", action: "fill", value: "" },
  ])
  const [submitSelector, setSubmitSelector] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [estimatedTime, setEstimatedTime] = useState(0)

  const addField = () => {
    setFields([
      ...fields,
      { id: Date.now().toString(), selector: "", action: "fill", value: "" },
    ])
  }

  const removeField = (id: string) => {
    if (fields.length > 1) {
      setFields(fields.filter((field) => field.id !== id))
    }
  }

  const updateField = (id: string, key: keyof FormField, value: string) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, [key]: value } : field
      )
    )
  }

  const calculateEstimatedTime = () => {
    // Simple estimation: 500ms per field + 1s for page load
    return fields.length * 500 + 1000
  }

  const handleRunTask = async () => {
    setIsRunning(true)
    setEstimatedTime(calculateEstimatedTime())
    
    // Simulate task execution
    setTimeout(() => {
      setIsRunning(false)
      alert("Task completed successfully! Check Task History for details.")
    }, calculateEstimatedTime())
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Run Automation</h1>
        <p className="text-muted-foreground">
          Configure and execute a new automation task
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Task Configuration</CardTitle>
          <CardDescription>
            Set up the target URL and define actions to automate
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Target URL */}
          <div className="space-y-2">
            <Label htmlFor="url">Target URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com/form"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          {/* Dynamic Field Builder */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Form Fields & Actions</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addField}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Field
              </Button>
            </div>

            {fields.map((field, index) => (
              <Card key={field.id} className="p-4">
                <div className="grid gap-4 md:grid-cols-12">
                  <div className="md:col-span-4">
                    <Label htmlFor={`selector-${field.id}`} className="text-xs">
                      CSS Selector
                    </Label>
                    <Input
                      id={`selector-${field.id}`}
                      placeholder="#email, .input-field"
                      value={field.selector}
                      onChange={(e) =>
                        updateField(field.id, "selector", e.target.value)
                      }
                    />
                  </div>
                  <div className="md:col-span-3">
                    <Label htmlFor={`action-${field.id}`} className="text-xs">
                      Action Type
                    </Label>
                    <Select
                      id={`action-${field.id}`}
                      value={field.action}
                      onChange={(e) =>
                        updateField(field.id, "action", e.target.value)
                      }
                    >
                      <option value="fill">Fill</option>
                      <option value="click">Click</option>
                      <option value="select">Select</option>
                      <option value="check">Check</option>
                      <option value="upload">Upload</option>
                      <option value="type">Type</option>
                    </Select>
                  </div>
                  <div className="md:col-span-4">
                    <Label htmlFor={`value-${field.id}`} className="text-xs">
                      Value
                    </Label>
                    <Input
                      id={`value-${field.id}`}
                      placeholder={
                        field.action === "click"
                          ? "Leave empty for click"
                          : "Enter value"
                      }
                      value={field.value}
                      onChange={(e) =>
                        updateField(field.id, "value", e.target.value)
                      }
                      disabled={field.action === "click"}
                    />
                  </div>
                  <div className="md:col-span-1 flex items-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeField(field.id)}
                      disabled={fields.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Submit Button Selector */}
          <div className="space-y-2">
            <Label htmlFor="submit">Submit Button Selector</Label>
            <Input
              id="submit"
              placeholder="#submit, button[type='submit']"
              value={submitSelector}
              onChange={(e) => setSubmitSelector(e.target.value)}
            />
          </div>

          {/* Estimated Time */}
          <div className="rounded-lg bg-muted p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Estimated Execution Time</p>
                <p className="text-xs text-muted-foreground">
                  Based on number of actions
                </p>
              </div>
              <p className="text-2xl font-bold text-primary">
                ~{calculateEstimatedTime()}ms
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handleRunTask}
              disabled={!url || isRunning}
              className="flex-1"
            >
              {isRunning ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Running Task ({estimatedTime}ms)
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Run Task
                </>
              )}
            </Button>
            <Button variant="outline" disabled={!url || isRunning}>
              Run Batch
            </Button>
          </div>

          {isRunning && (
            <div className="space-y-2">
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 animate-pulse"
                  style={{ width: "60%" }}
                />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Executing automation task...
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
