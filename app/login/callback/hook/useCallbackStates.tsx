"use client";

import { useContext } from "react";
import { userContext } from "../context/userContext";

export default function useCallbackStates() {
  const userStates = useContext(userContext);

  if (!userStates) throw new Error("User must be within a provider");

  return { ...userStates };
}
