"use client";

import React, { useContext } from "react";
import { buildKeycloakLoginUrl } from "@/lib/keycloak/buildLoginUrl";
import { LoginContext } from "../context/LoginContext";

export default function useLoginApi() {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    throw new Error("login must be used within a MediaAssetsProvider");
  }

  const { setLoading, setError } = loginContext;

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      window.location.assign(await buildKeycloakLoginUrl());
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to start the identity login flow.",
      );
      setLoading(false);
    }
  };

  return { handleLogin };
}
