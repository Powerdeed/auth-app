export const APP_URLS = {
  auth: process.env.NEXT_PUBLIC_AUTH_APP_URL || "http://localhost:3001",
  cms: process.env.NEXT_PUBLIC_CMS_APP_URL || "http://localhost:3002",
  command:
    process.env.NEXT_PUBLIC_COMMAND_CENTER_APP_URL || "http://localhost:3003",
};
