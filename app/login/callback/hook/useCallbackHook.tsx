"use client";

import useCallbackApi from "./useCallbackApi";
import useCallbackStates from "./useCallbackStates";

export default function useCallbackHook() {
  const states = useCallbackStates();
  const api = useCallbackApi();

  return { states, actions: { ...api } };
}
