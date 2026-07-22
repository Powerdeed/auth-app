export const APP_URLS = {
  auth: {
    local: "http://localhost:3001",
    production: "https://auth.powerdeed.co.ke",
  },
  cms: {
    local: "http://localhost:3002",
    production: "https://cms.powerdeed.co.ke",
  },
  command: {
    local: "http://localhost:3003",
    production: "https://command.powerdeed.co.ke",
  },
};

export type AppKey = keyof typeof APP_URLS;

export const isAppKey = (value: string | null): value is AppKey =>
  value !== null && Object.prototype.hasOwnProperty.call(APP_URLS, value);

const isLocalBrowser = () => {
  if (typeof window === "undefined") return true;

  return ["localhost", "127.0.0.1"].includes(window.location.hostname);
};

export const getAppUrl = (client: string | null) => {
  const clientKey = isAppKey(client) ? client : "cms";
  const appUrl = APP_URLS[clientKey];

  return isLocalBrowser() ? appUrl.local : appUrl.production;
};

export const getSafeReturnTo = (value: string | null) => {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  if (value.startsWith("/login")) return "/";

  return value;
};
