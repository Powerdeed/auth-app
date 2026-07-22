"use client";

import { KEYCLOAK_CLIENT_ID, KEYCLOAK_REALM, KEYCLOAK_URL } from "@env";
import { getKeycloakRedirectUri } from "./getRedirectUri";
import { getSafeReturnTo, isAppKey } from "./constants/AppURLs";

const base64UrlEncode = (value: ArrayBuffer | Uint8Array) =>
  btoa(String.fromCharCode(...new Uint8Array(value)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

const createRandomString = () => {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return base64UrlEncode(bytes);
};

const createCodeChallenge = async (verifier: string) => {
  const encodedVerifier = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", encodedVerifier);
  return base64UrlEncode(digest);
};

export const buildKeycloakLoginUrl = async () => {
  const state = createRandomString();
  const codeVerifier = createRandomString();
  const codeChallenge = await createCodeChallenge(codeVerifier);
  const redirectUri = getKeycloakRedirectUri();
  const searchParams = new URLSearchParams(window.location.search);

  const returnTo = searchParams.get("returnTo");
  const client = searchParams.get("client");
  const clientKey = isAppKey(client) ? client : "cms";

  sessionStorage.setItem("clientKey", clientKey);
  sessionStorage.setItem("returnTo", getSafeReturnTo(returnTo));
  sessionStorage.setItem("keycloak_oauth_state", state);
  sessionStorage.setItem("keycloak_pkce_verifier", codeVerifier);

  const loginUrl = new URL(
    `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/auth`,
  );

  loginUrl.searchParams.set("client_id", KEYCLOAK_CLIENT_ID);
  loginUrl.searchParams.set("redirect_uri", redirectUri);
  loginUrl.searchParams.set("response_type", "code");
  loginUrl.searchParams.set("scope", "openid profile email");
  loginUrl.searchParams.set("state", state);
  loginUrl.searchParams.set("code_challenge", codeChallenge);
  loginUrl.searchParams.set("code_challenge_method", "S256");

  return loginUrl.toString();
};
