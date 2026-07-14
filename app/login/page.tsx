"use client";

import { useEffect, useState } from "react";
import { SectionTitle } from "@global-components/ui/Title";
import { buildKeycloakLoginUrl } from "@/lib/keycloak/buildLoginUrl";

export default function Login() {
  const [error, setError] = useState("");

  useEffect(() => {
    const startLogin = async () => {
      try {
        window.location.assign(await buildKeycloakLoginUrl());
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to start the identity login flow.",
        );
      }
    };

    void startLogin();
  }, []);

  return (
    <main className="grid min-h-screen place-items-center bg-background p-5">
      <section className="feature-container-vertical w-full max-w-110 text-center">
        <SectionTitle title="Powerdeed Identity" style="text-center" />
        <p
          className={`text-style__body ${
            error ? "text-(--primary-red)" : "text-(--primary-grey)"
          }`}
        >
          {error || "Opening secure login..."}
        </p>
      </section>
    </main>
  );
}
