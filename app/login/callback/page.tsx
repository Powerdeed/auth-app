"use client";

import { useEffect, useRef, useState } from "react";
import { SectionTitle } from "@global-components/ui/Title";
import {
  exchangeKeycloakCodeForTokens,
  storeKeycloakTokens,
} from "@/lib/keycloak/tokenExchange";

export default function LoginCallbackPage() {
  const hasExchangedCode = useRef(false);
  const [status, setStatus] = useState("Completing identity login...");
  const [exchangeError, setExchangeError] = useState("");

  useEffect(() => {
    if (hasExchangedCode.current) return;

    const exchangeCode = async () => {
      try {
        setStatus("Reading Keycloak login response...");

        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get("code");
        const error = searchParams.get("error");
        const returnedState = searchParams.get("state");

        if (error) {
          throw new Error(`Keycloak returned an authentication error: ${error}`);
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
        setStatus("Requesting access tokens from Keycloak...");
        const tokens = await exchangeKeycloakCodeForTokens(code);
        setStatus("Saving identity session...");
        storeKeycloakTokens(tokens);
        setStatus("Identity login completed successfully.");
      } catch (err) {
        setExchangeError(
          err instanceof Error
            ? err.message
            : "Unable to complete the identity login.",
        );
      }
    };

    void exchangeCode();
  }, []);

  return (
    <main className="grid min-h-screen place-items-center bg-background p-5">
      <section className="feature-container-vertical w-full max-w-110 text-center">
        <SectionTitle title="PTR Identity" style="text-center" />

        <p
          className={`text-style__body ${
            exchangeError ? "text-(--primary-red)" : "text-(--primary-grey)"
          }`}
        >
          {exchangeError || status}
        </p>
      </section>
    </main>
  );
}
