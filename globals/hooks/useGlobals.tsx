"use client";

import useGlobalStates from "./useGlobalStates";
import useUser from "./useUser";

export default function useGlobals() {
  const states = useGlobalStates();

  const user = useUser();

  return {
    globalStates: { ...states },
    globalActions: { ...user },
  };
}
