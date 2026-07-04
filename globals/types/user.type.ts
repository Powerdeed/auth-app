export type UserRole = "viewer" | "sales" | "editor" | "admin";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  accessScopes?: UserAccessScope[];
  profile?: UserProfile;
  preferences?: UserPreferences;
  security?: UserSecurity;
  activitySummary?: UserActivitySummary;
  roleGovernance?: UserRoleGovernance;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export type UserAccessScope =
  | "dashboard"
  | "leads"
  | "services"
  | "projects"
  | "websiteContent"
  | "articles"
  | "media"
  | "scheduling"
  | "reports"
  | "customization"
  | "settings"
  | "users";

export type UserThemePreference = "system" | "light" | "dark";
export type DashboardDensity = "compact" | "comfortable";
export type AccountStatus = "active" | "suspended" | "pendingReview";

export interface UserProfile {
  preferredName?: string;
  avatarUrl?: string;
  phone?: string;
  department?: string;
  jobTitle?: string;
  bio?: string;
  location?: string;
  timezone?: string;
}

export interface UserNotificationPreferences {
  emailAlerts?: boolean;
  securityAlerts?: boolean;
  publishingSummaries?: boolean;
  uploadFailureReports?: boolean;
  weeklyActivityDigest?: boolean;
}

export interface UserWorkflowPreferences {
  draftBeforePublish?: boolean;
  requireAssetMetadata?: boolean;
  warnBeforeReplacingLiveMedia?: boolean;
  markStalePagesForReview?: boolean;
}

export interface UserPreferences {
  theme?: UserThemePreference;
  dashboardDensity?: DashboardDensity;
  defaultLandingPage?: string;
  preservePanelFilters?: boolean;
  showAdvancedAssetMetadata?: boolean;
  publishConfirmations?: boolean;
  notifications?: UserNotificationPreferences;
  workflow?: UserWorkflowPreferences;
}

export interface UserSecurity {
  accountStatus?: AccountStatus;
  recoveryEmail?: string;
  recoveryEmailVerifiedAt?: string | null;
  twoFactorEnabled?: boolean;
  passwordChangedAt?: string | null;
  lastLoginAt?: string | null;
  lastLoginIp?: string;
  sessionTimeoutMinutes?: number;
}

export interface UserActivitySummary {
  editsThisWeek?: number;
  pendingReviews?: number;
  uploadsChecked?: number;
  publishingStreakDays?: number;
  lastActiveAt?: string | null;
}

export interface UserRoleGovernance {
  grantedBy?: string | null;
  grantedAt?: string | null;
  lastReviewedAt?: string | null;
  reviewNotes?: string;
}

export type UserUpdatePayload = Partial<
  Pick<User, "name" | "email" | "role" | "accessScopes"> & {
    profile: UserProfile;
    preferences: UserPreferences;
    security: UserSecurity;
    activitySummary: UserActivitySummary;
    roleGovernance: UserRoleGovernance;
  }
>;

export type ModifyUserPayload = UserUpdatePayload;

export interface UserSession {
  _id: string;
  user: string;
  refreshToken?: string;
  userAgent?: string;
  ip?: string;
  isRevoked: boolean;
  expiresAt?: string;
  createdAt?: string;
  updatedAt?: string;
}
