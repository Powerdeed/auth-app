export const FEATURE_OPTIONS = [
  {
    label: "Command Overview",
    IconPrefix: "fas",
    IconName: "sliders",
    description: "",
  },
  {
    label: "App Launcher",
    IconPrefix: "fas",
    IconName: "arrow-up-right-from-square",
    description: "Browse and launch internal applications",
  },
  {
    label: "Approvals",
    IconPrefix: "fas",
    IconName: "check-double",
    description: "Review and approve pending requests",
  },
  {
    label: "Tasks",
    IconPrefix: "fas",
    IconName: "list-check",
    description: "Manage and track your tasks across applications",
  },
  {
    label: "Activity",
    IconPrefix: "fas",
    IconName: "chart-line",
    description: "Monitor cross-platform activity and events",
  },
  {
    label: "Reports",
    IconPrefix: "far",
    IconName: "file-lines",
    description: "",
  },
  {
    label: "Security & Access",
    IconPrefix: "fas",
    IconName: "shield-halved",
    description: "Monitor security events and manage access controls",
  },
  {
    label: "System Health",
    IconPrefix: "far",
    IconName: "hard-drive",
    description: "Monitor infrastructure and service status",
  },
  {
    label: "Settings",
    IconPrefix: "fas",
    IconName: "gear",
    description: "Manage your account, workspace, and platform preferences",
  },
];

export type FeatureOptions = (typeof FEATURE_OPTIONS)[number]["label"];
