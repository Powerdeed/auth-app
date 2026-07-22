# Powerdeed Auth App

Next.js app that coordinates browser login between internal apps, Keycloak, and
identity-service.

## Responsibility

Auth-app does not store passwords and does not own the user database. It:

- Receives app login redirects such as `?client=cms&returnTo=/dashboard`
- Starts Keycloak OIDC authorization-code login with PKCE
- Handles the Keycloak callback
- Sends the authorization code and PKCE verifier to identity-service
- Redirects the browser back to the requesting app

Keycloak owns password entry, forgot-password, MFA, and the SSO browser session.
Identity-service owns the Powerdeed HttpOnly session cookie.

## Routes

```txt
/login
  Redirect launcher. Reads client/returnTo and sends the browser to Keycloak.

/login/callback
  Receives Keycloak callback, asks identity-service to create the session, then
  redirects back to the requesting app.
```

## Environment

```txt
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api/identity
IDENTITY_SERVICE_ORIGIN=http://localhost:8080
NEXT_PUBLIC_AUTH_APP_URL=http://localhost:3001
NEXT_PUBLIC_CMS_APP_URL=http://localhost:3002
NEXT_PUBLIC_COMMAND_CENTER_APP_URL=http://localhost:3003
NEXT_PUBLIC_KEYCLOAK_URL=https://keycloak.powerdeed.co.ke
NEXT_PUBLIC_KEYCLOAK_REALM=powerdeed
NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=auth-app
```

`NEXT_PUBLIC_API_BASE_URL` points to auth-app's identity proxy. The proxy
forwards to `IDENTITY_SERVICE_ORIGIN`.
Auth-app builds the Keycloak redirect URI from the current browser origin.

## Client Registry

Known app redirect targets live in:

```txt
lib/keycloak/constants/AppURLs.ts
```

Keep this list aligned with Keycloak client redirect/post-logout settings.
