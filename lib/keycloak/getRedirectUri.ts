"use client";

import { KEYCLOAK_REDIRECT_URI } from "@env";

export const getKeycloakRedirectUri = () => {
  const currentRedirectUri = `${window.location.origin}/login/callback`;
  const configuredRedirectUri = KEYCLOAK_REDIRECT_URI?.trim();

  if (!configuredRedirectUri) return currentRedirectUri;

  try {
    const configuredUrl = new URL(configuredRedirectUri);
    const currentUrl = new URL(currentRedirectUri);

    if (
      currentUrl.hostname !== "localhost" &&
      configuredUrl.hostname === "localhost"
    ) {
      return currentRedirectUri;
    }
  } catch {
    return currentRedirectUri;
  }

  return configuredRedirectUri;
};
