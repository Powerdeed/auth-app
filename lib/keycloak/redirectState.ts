"use client";

import { AppKey, isAppKey } from "./constants/AppURLs";

type LoginState = {
  nonce: string;
  client: AppKey;
  returnTo: string;
};

const base64UrlEncodeText = (value: string) =>
  btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const base64UrlDecodeText = (value: string) => {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "=",
  );

  return atob(padded);
};

export const normalizeReturnTo = (value: string | null) => {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  if (value.startsWith("/login")) return "/";

  return value;
};

export const createLoginState = ({
  nonce,
  client,
  returnTo,
}: LoginState) =>
  base64UrlEncodeText(
    JSON.stringify({
      nonce,
      client,
      returnTo: normalizeReturnTo(returnTo),
    }),
  );

export const readLoginState = (value: string): LoginState | null => {
  try {
    const parsed = JSON.parse(base64UrlDecodeText(value)) as Partial<LoginState>;
    const client = parsed.client ?? null;

    if (
      typeof parsed.nonce !== "string" ||
      !isAppKey(client)
    ) {
      return null;
    }

    return {
      nonce: parsed.nonce,
      client,
      returnTo: normalizeReturnTo(parsed.returnTo ?? null),
    };
  } catch {
    return null;
  }
};
