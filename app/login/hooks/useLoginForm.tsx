"use client";

import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import { UserCredentials } from "@/globals";

export default function useLoginForm() {
  const loginContext = useContext(LoginContext);

  if (!loginContext) {
    throw new Error("useMediaAssets must be used within a MediaAssetsProvider");
  }

  const { setUsercredentials, setIsVisible, setIsChecked, isChecked } =
    loginContext;

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const handleRememberMe = () => {
    setIsChecked(!isChecked);
  };

  const updateUserCredentials = (key: keyof UserCredentials, val: string) =>
    setUsercredentials((prev) => ({ ...prev, [key]: val }));

  return { toggleVisibility, handleRememberMe, updateUserCredentials };
}
