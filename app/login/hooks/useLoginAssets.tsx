"use client";

import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";

export default function useLoginAssets() {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    throw new Error("useMediaAssets must be used within a MediaAssetsProvider");
  }

  return {
    ...loginContext,
  };
}
