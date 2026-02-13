"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Settings as SettingsIcon,
  Globe,
  Key,
  Monitor,
  Brain,
  Bell,
  Check,
  Loader2,
} from "lucide-react"

export default function SettingsPage() {
  const [apiUrl, setApiUrl] = useState("https://api.foodex.ai/v1")
  const [apiKey, setApiKey] = useState("fex_12345678901234567890")
  const [headlessMode, setHeadlessMode] = useState(true)
  const [blockImages, setBlockImages] = useState(false)
  const [blockAds, setBlockAds] = useState(true)
  const [timeoutValue, setTimeoutValue] = useState("30000")
  const [aiModel, setAiModel] = useState("gpt-4o-mini")
  const [sensitivity, setSensitivity] = useState("75")
  const [webhookUrl, setWebhookUrl] = useState("")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [notifyOnFailure, setNotifyOnFailure] = useState(true)
  const [testing, setTesting] = useState(false)
  const [testSuccess, setTestSuccess] = useState(false)

  const handleTestConnection = async () => {
    setTesting(true)
    setTestSuccess(false)
    
    // Simulate API test
    setTimeout(() => {
      setTesting(false)
      setTestSuccess(true)
      setTimeout(() => setTestSuccess(false), 3000)
    }, 2000)
  }

  const handleSave = () => {
    alert("Settings saved successfully!")
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Configure your automation engine preferences
        </p>
      </div>

      {/* API Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <CardTitle>API Configuration</CardTitle>
          </div>
          <CardDescription>
            Configure your API endpoint and authentication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-url">API Base URL</Label>
            <Input
              id="api-url"
              type="url"
              placeholder="https://api.foodex.ai/v1"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <div className="flex gap-2">
              <Input
                id="api-key"
                type="password"
                placeholder="fex_************************"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <Button
                variant="outline"
                onClick={handleTestConnection}
                disabled={testing}
              >
                {testing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Testing...
                  </>
                ) : testSuccess ? (
                  <>
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    Connected
                  </>
                ) : (
                  "Test Connection"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Browser Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            <CardTitle>Browser Settings</CardTitle>
          </div>
          <CardDescription>
            Configure browser behavior and optimizations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="headless">Headless Mode</Label>
              <p className="text-sm text-muted-foreground">
                Run browser in background without GUI
              </p>
            </div>
            <button
              id="headless"
              onClick={() => setHeadlessMode(!headlessMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                headlessMode ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  headlessMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="block-images">Block Images</Label>
              <p className="text-sm text-muted-foreground">
                Disable image loading for faster execution
              </p>
            </div>
            <button
              id="block-images"
              onClick={() => setBlockImages(!blockImages)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                blockImages ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  blockImages ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="block-ads">Block Ads</Label>
              <p className="text-sm text-muted-foreground">
                Block advertisements and trackers
              </p>
            </div>
            <button
              id="block-ads"
              onClick={() => setBlockAds(!blockAds)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                blockAds ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  blockAds ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeout">Default Timeout (ms)</Label>
            <Input
              id="timeout"
              type="number"
              placeholder="30000"
              value={timeoutValue}
              onChange={(e) => setTimeoutValue(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Maximum time to wait for page actions
            </p>
          </div>
        </CardContent>
      </Card>

      {/* AI Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            <CardTitle>AI Settings</CardTitle>
          </div>
          <CardDescription>
            Configure AI model and error detection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ai-model">AI Model</Label>
            <Select
              id="ai-model"
              value={aiModel}
              onChange={(e) => setAiModel(e.target.value)}
            >
              <option value="gpt-4o-mini">GPT-4o-mini (Fast & Economical)</option>
              <option value="gpt-4o">GPT-4o (Balanced)</option>
              <option value="claude-haiku">Claude Haiku (Alternative)</option>
            </Select>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline">Speed: Fast</Badge>
              <Badge variant="outline">Cost: Low</Badge>
              <Badge variant="outline">Accuracy: High</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="sensitivity">Error Detection Sensitivity</Label>
              <span className="text-sm font-medium">{sensitivity}%</span>
            </div>
            <input
              id="sensitivity"
              type="range"
              min="0"
              max="100"
              value={sensitivity}
              onChange={(e) => setSensitivity(e.target.value)}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <p className="text-xs text-muted-foreground">
              Higher sensitivity catches more errors but may increase false positives
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <CardTitle>Notification Settings</CardTitle>
          </div>
          <CardDescription>
            Configure alerts and notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input
              id="webhook-url"
              type="url"
              placeholder="https://hooks.slack.com/services/..."
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Receive real-time alerts via webhook
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email alerts for important events
              </p>
            </div>
            <button
              id="email-notifications"
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                emailNotifications ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  emailNotifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notify-failure">Notify on Failure</Label>
              <p className="text-sm text-muted-foreground">
                Send alert when a task fails
              </p>
            </div>
            <button
              id="notify-failure"
              onClick={() => setNotifyOnFailure(!notifyOnFailure)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifyOnFailure ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifyOnFailure ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <Button variant="outline">Reset to Defaults</Button>
        <Button onClick={handleSave}>
          <Check className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
