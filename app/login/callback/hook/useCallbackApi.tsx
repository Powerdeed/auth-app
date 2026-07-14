"use client";

import { useContext, useEffect, useRef } from "react";
import { userContext } from "../context/userContext";
import { execute } from "@lib";
import { createIdentitySession } from "../services/user.service";
import { getSearchParams } from "../utils/searchParams";

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

        hasExchangedCode.current = true;

        const codeVerifier = sessionStorage.getItem("keycloak_pkce_verifier");

        if (!codeVerifier) {
          throw new Error("Missing PKCE verifier. Start the login flow again.");
        }

        setStatus("Creating secure identity session...");
        await execute(
          () => createIdentitySession(code, codeVerifier),
          {
            setLoading: setFetchingUserData,
            setError: setFetchingUserDataError,
            onSuccess: (userData) => setUser(userData),
          },
        );

        sessionStorage.removeItem("keycloak_oauth_state");
        sessionStorage.removeItem("keycloak_pkce_verifier");

        setStatus("Identity login completed successfully, redirecting back...");
        const client =
          sessionStorage.getItem("client") || "http://localhost:3001";
        const storedReturnTo = sessionStorage.getItem("returnTo") || "/";
        const returnTo = storedReturnTo.startsWith("/") ? storedReturnTo : "/";
        window.location.assign(`${client}${returnTo}`);
      } catch (err) {
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
