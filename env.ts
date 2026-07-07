export const KEYCLOAK_URL =
  process.env.NEXT_PUBLIC_KEYCLOAK_URL || "http://localhost:8081";
export const KEYCLOAK_REALM = process.env.NEXT_PUBLIC_KEYCLOAK_REALM || "ptr";
export const KEYCLOAK_CLIENT_ID =
  process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || "auth-app";
export const KEYCLOAK_REDIRECT_URI =
  process.env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI || "";
