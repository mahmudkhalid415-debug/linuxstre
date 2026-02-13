export interface Task {
  id: string;
  url: string;
  status: "success" | "failed" | "running";
  executionTime: number;
  timestamp: Date;
  aiAnalysis: string;
  fields?: Array<{
    selector: string;
    action: string;
    value: string;
  }>;
}

export interface ErrorLog {
  id: string;
  taskId: string;
  errorType: string;
  diagnosis: string;
  suggestions: string[];
  affectedFields: string[];
  timestamp: Date;
}

// Generate mock tasks
export function generateMockTasks(count: number): Task[] {
  const urls = [
    "https://forms.company.com/register",
    "https://checkout.store.com/payment",
    "https://portal.business.com/login",
    "https://app.service.com/onboarding",
    "https://admin.platform.com/settings",
  ];

  const statuses: Task["status"][] = ["success", "success", "success", "failed", "running"];
  
  const tasks: Task[] = [];
  for (let i = 0; i < count; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    tasks.push({
      id: `TASK-${String(1000 + i).padStart(4, "0")}`,
      url: urls[Math.floor(Math.random() * urls.length)],
      status,
      executionTime: Math.floor(Math.random() * 5000) + 500,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
      aiAnalysis: status === "success" 
        ? "All fields filled successfully. No errors detected. Form submission completed."
        : status === "failed"
        ? "CAPTCHA detected on page. Unable to proceed. Recommend manual intervention."
        : "Task in progress. Waiting for page load...",
      fields: [
        { selector: "#email", action: "fill", value: "user@example.com" },
        { selector: "#password", action: "fill", value: "********" },
        { selector: "#submit", action: "click", value: "" },
      ],
    });
  }
  
  return tasks.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

// Generate mock errors
export function generateMockErrors(count: number): ErrorLog[] {
  const errorTypes = [
    "VALIDATION_ERROR",
    "CAPTCHA_DETECTED",
    "SERVER_ERROR",
    "TIMEOUT_ERROR",
    "SELECTOR_NOT_FOUND",
    "AUTHENTICATION_FAILED",
  ];

  const errors: ErrorLog[] = [];
  for (let i = 0; i < count; i++) {
    const errorType = errorTypes[Math.floor(Math.random() * errorTypes.length)];
    errors.push({
      id: `ERR-${String(1000 + i).padStart(4, "0")}`,
      taskId: `TASK-${String(1000 + Math.floor(Math.random() * 100)).padStart(4, "0")}`,
      errorType,
      diagnosis: getDiagnosis(errorType),
      suggestions: getSuggestions(errorType),
      affectedFields: ["#email", "#password", "#submit"].slice(0, Math.floor(Math.random() * 3) + 1),
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    });
  }
  
  return errors.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

function getDiagnosis(errorType: string): string {
  const diagnoses: Record<string, string> = {
    VALIDATION_ERROR: "Form validation failed. Input does not match expected format.",
    CAPTCHA_DETECTED: "CAPTCHA challenge detected. Automation blocked by anti-bot protection.",
    SERVER_ERROR: "Server returned 500 error. Backend service unavailable.",
    TIMEOUT_ERROR: "Page load timeout exceeded. Network or server latency issues.",
    SELECTOR_NOT_FOUND: "CSS selector not found on page. Element may have changed or page structure updated.",
    AUTHENTICATION_FAILED: "Invalid credentials or session expired. Authentication error.",
  };
  return diagnoses[errorType] || "Unknown error occurred.";
}

function getSuggestions(errorType: string): string[] {
  const suggestions: Record<string, string[]> = {
    VALIDATION_ERROR: [
      "Verify input format matches field requirements",
      "Check for special character restrictions",
      "Review field length constraints",
    ],
    CAPTCHA_DETECTED: [
      "Enable CAPTCHA solving service integration",
      "Use residential proxy to reduce detection",
      "Add random delays between actions",
    ],
    SERVER_ERROR: [
      "Retry request after delay",
      "Check server status and uptime",
      "Contact service provider",
    ],
    TIMEOUT_ERROR: [
      "Increase timeout duration in settings",
      "Check network connection stability",
      "Verify server response time",
    ],
    SELECTOR_NOT_FOUND: [
      "Update CSS selector to match current page structure",
      "Use more robust selector (ID over class)",
      "Verify page loaded completely before action",
    ],
    AUTHENTICATION_FAILED: [
      "Verify credentials are correct",
      "Check if account is locked or suspended",
      "Clear cookies and retry",
    ],
  };
  return suggestions[errorType] || ["Review logs for more details"];
}

// Generate analytics data
export function getAnalyticsData() {
  const days = 7;
  const tasksOverTime = [];
  const speedOverTime = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    tasksOverTime.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      success: Math.floor(Math.random() * 50) + 20,
      failed: Math.floor(Math.random() * 10) + 2,
    });
    speedOverTime.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      avgSpeed: Math.floor(Math.random() * 1000) + 1500,
    });
  }
  
  return {
    tasksOverTime,
    speedOverTime,
    errorDistribution: [
      { name: "CAPTCHA", value: 35 },
      { name: "Validation", value: 25 },
      { name: "Timeout", value: 20 },
      { name: "Server Error", value: 12 },
      { name: "Other", value: 8 },
    ],
  };
}

// Get dashboard metrics
export function getDashboardMetrics() {
  const tasks = generateMockTasks(100);
  const successCount = tasks.filter(t => t.status === "success").length;
  const failedCount = tasks.filter(t => t.status === "failed").length;
  const avgSpeed = Math.floor(tasks.reduce((sum, t) => sum + t.executionTime, 0) / tasks.length);
  
  return {
    totalTasks: tasks.length,
    successRate: Math.floor((successCount / tasks.length) * 100),
    avgSpeed,
    activeWorkers: Math.floor(Math.random() * 5) + 3,
    failedTasks: failedCount,
  };
}
