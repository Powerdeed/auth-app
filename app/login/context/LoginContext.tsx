"use client";

import { UserCredentials } from "@/globals";
import { createContext, Dispatch } from "react";

type LoginState = {
  // asset and meta
  isChecked: boolean;
  setIsChecked: Dispatch<React.SetStateAction<boolean>>;
  isVisible: boolean;

  setIsVisible: Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;

  setLoading: Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: Dispatch<React.SetStateAction<string>>;

  userCredentials: UserCredentials;
  setUsercredentials: Dispatch<React.SetStateAction<UserCredentials>>;
};

export const LoginContext = createContext<LoginState | null>(null);
