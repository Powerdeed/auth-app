"use client";

import { useContext } from "react";

import { globalContext } from "../context/GlobalContext";

export default function useGlobalStates() {
  const globalStates = useContext(globalContext);

  if (!globalStates)
    throw new Error("Global Context context must be withing a provider.");

  return { ...globalStates };
}
