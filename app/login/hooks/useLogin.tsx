"use client";

import useLoginApi from "./useLoginApi";
import useLoginAssets from "./useLoginAssets";
import useLoginForm from "./useLoginForm";

export default function useLogin() {
  const state = useLoginAssets();
  const api = useLoginApi();
  const login = useLoginForm();

  return {
    state,
    actions: { ...api, ...login },
  };
}
