"use client";

import { useContext, useEffect, useRef } from "react";
import { userContext } from "../context/userContext";
import { ApiError } from "@lib/api/utils/apiError";
import { createIdentitySession } from "../services/user.service";
import { getSearchParams } from "../utils/searchParams";
import { getAppUrl } from "@lib/keycloak/constants/AppURLs";
import { readLoginState } from "@lib/keycloak/redirectState";

export default function useCallbackApi() {
  const hasExchangedCode = useRef(false);
  const userStates = useContext(userContext);

  if (!userStates) throw new Error("User must be within a provider");

  const {
    setStatus,
    setExchangeError,
    setUser,
    setFetchingUserData,
    setFetchingUserDataError,
  } = userStates;

  useEffect(() => {
    if (hasExchangedCode.current) return;

    const exchangeCode = async () => {
      try {
        setStatus("Reading Keycloak login response...");

        const { code, error, returnedState } = getSearchParams();

        if (error) {
          throw new Error(
            `Keycloak returned an authentication error: ${error}`,
          );
        }

        if (!code) {
          setStatus("Waiting for the identity login response.");
          return;
        }

        setStatus("Validating login state...");

        const expectedState = sessionStorage.getItem("keycloak_oauth_state");

        if (!expectedState || returnedState !== expectedState) {
          throw new Error("Invalid login state. Start the login flow again.");
        }

        const loginState = readLoginState(returnedState);

        if (!loginState) {
          throw new Error("Invalid login destination. Start the login flow again.");
        }

        hasExchangedCode.current = true;

        const codeVerifier = sessionStorage.getItem("keycloak_pkce_verifier");

        if (!codeVerifier) {
          throw new Error("Missing PKCE verifier. Start the login flow again.");
        }

        setStatus("Creating secure identity session...");
        setFetchingUserData(true);
        setFetchingUserDataError("");
        const userData = await createIdentitySession(code, codeVerifier);
        setUser(userData);
        setFetchingUserData(false);

        if (!userData) {
          throw new Error(
            "Identity-service did not create a session. Check the callback error and identity-service logs.",
          );
        }

        sessionStorage.removeItem("keycloak_oauth_state");
        sessionStorage.removeItem("keycloak_pkce_verifier");

        setStatus("Identity login completed successfully, redirecting back...");
        const client = getAppUrl(loginState.client);
        const redirectUrl = new URL(loginState.returnTo, client);

        window.location.replace(redirectUrl.toString());
      } catch (err) {
        setFetchingUserData(false);

        if (err instanceof ApiError) {
          setFetchingUserDataError(err.message);
          setExchangeError(err.message);
          return;
        }

        setExchangeError(
          err instanceof Error
            ? err.message
            : "Unable to complete the identity login.",
        );
      }
    };

    void exchangeCode();
  }, [
    setExchangeError,
    setFetchingUserData,
    setFetchingUserDataError,
    setStatus,
    setUser,
  ]);

  return {};
}
