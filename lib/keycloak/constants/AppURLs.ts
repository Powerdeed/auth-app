export const APP_URLS = {
  auth: {
    local: "http://localhost:3001",
    production: "https://auth.powerdeed.co.ke",
    configured: process.env.NEXT_PUBLIC_AUTH_APP_URL,
  },
  cms: {
    local: "http://localhost:3002",
    production: "https://cms.powerdeed.co.ke",
    configured: process.env.NEXT_PUBLIC_CMS_APP_URL,
  },
  command: {
    local: "http://localhost:3003",
    production: "https://command.powerdeed.co.ke",
    configured: process.env.NEXT_PUBLIC_COMMAND_CENTER_APP_URL,
  },
};

export type AppKey = keyof typeof APP_URLS;

export const isAppKey = (value: string | null): value is AppKey =>
  value !== null && Object.prototype.hasOwnProperty.call(APP_URLS, value);

const isLocalBrowser = () => {
  if (typeof window === "undefined") return true;

  return ["localhost", "127.0.0.1"].includes(window.location.hostname);
};

const isLocalUrl = (value: string) => {
  try {
    return ["localhost", "127.0.0.1"].includes(new URL(value).hostname);
  } catch {
    return false;
  }
};

export const getAppUrl = (client: string | null) => {
  const clientKey = isAppKey(client) ? client : "auth";
  const appUrl = APP_URLS[clientKey];
  const localBrowser = isLocalBrowser();

  if (
    appUrl.configured &&
    (localBrowser || !isLocalUrl(appUrl.configured))
  ) {
    return appUrl.configured;
  }

  return localBrowser ? appUrl.local : appUrl.production;
};
