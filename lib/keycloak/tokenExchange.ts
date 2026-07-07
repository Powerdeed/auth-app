"use client";

import {
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_REALM,
  KEYCLOAK_REDIRECT_URI,
  KEYCLOAK_URL,
} from "@env";
import { KeycloakTokenClaims, KeycloakTokenResponse } from "./types";

const getRedirectUri = () =>
  KEYCLOAK_REDIRECT_URI || `${window.location.origin}/login/callback`;

const decodeBase64Url = (value: string) => {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "=",
  );
  return atob(padded);
};

const decodeJwtClaims = (token: string): KeycloakTokenClaims => {
  const [, payload] = token.split(".");

  if (!payload) return {};

  return JSON.parse(decodeBase64Url(payload)) as KeycloakTokenClaims;
};

export const exchangeKeycloakCodeForTokens = async (code: string) => {
  const codeVerifier = sessionStorage.getItem("keycloak_pkce_verifier");

  if (!codeVerifier) {
    throw new Error("Missing PKCE verifier. Start the login flow again.");
  }

  const tokenUrl = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`;
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: KEYCLOAK_CLIENT_ID,
    redirect_uri: getRedirectUri(),
    code,
    code_verifier: codeVerifier,
  });

  let response: Response;
  const abortController = new AbortController();
  const timeoutId = window.setTimeout(() => abortController.abort(), 10000);

  try {
    response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
      signal: abortController.signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error(
        "Keycloak token exchange timed out. Check the auth-app client Web Origins and redirect URI settings.",
      );
    }

    throw new Error(
      "Unable to reach Keycloak token endpoint. Check that Keycloak is running and that the auth-app client Web Origins includes this app origin.",
    );
  } finally {
    window.clearTimeout(timeoutId);
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Keycloak token exchange failed (${response.status}). ${errorText}`,
    );
  }

  return (await response.json()) as KeycloakTokenResponse;
};

export const storeKeycloakTokens = (tokens: KeycloakTokenResponse) => {
  const claims = decodeJwtClaims(tokens.id_token || tokens.access_token);
  const roles = claims.realm_access?.roles || [];

  localStorage.setItem("accessToken", tokens.access_token);

  if (tokens.refresh_token) {
    localStorage.setItem("refreshToken", tokens.refresh_token);
  }

  localStorage.setItem(
    "user",
    JSON.stringify({
      _id: claims.sub || "",
      name:
        claims.name || claims.preferred_username || claims.email || "PTR User",
      email: claims.email || "",
      role: roles.includes("admin") ? "admin" : "viewer",
      keycloakUserId: claims.sub,
    }),
  );

  sessionStorage.removeItem("keycloak_oauth_state");
  sessionStorage.removeItem("keycloak_pkce_verifier");
};
