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

const getSafeConfiguredUrl = (value: string | undefined) => {
  if (!value) return "";

  try {
    const url = new URL(value);

    if (!["http:", "https:"].includes(url.protocol)) return "";

    return url.toString().replace(/\/$/, "");
  } catch {
    return "";
  }
};

export const getAppUrl = (client: string | null) => {
  const clientKey = isAppKey(client) ? client : "auth";
  const appUrl = APP_URLS[clientKey];
  const localBrowser = isLocalBrowser();
  const configuredUrl = getSafeConfiguredUrl(appUrl.configured);

  if (
    configuredUrl &&
    (localBrowser ||
      !["localhost", "127.0.0.1"].includes(new URL(configuredUrl).hostname))
  ) {
    return configuredUrl;
  }

  return localBrowser ? appUrl.local : appUrl.production;
};
