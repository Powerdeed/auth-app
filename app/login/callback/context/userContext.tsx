"use client";

import { User } from "@globals";
import { createContext, Dispatch, SetStateAction } from "react";

interface UserContextTypes {
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  exchangeError: string;
  setExchangeError: Dispatch<SetStateAction<string>>;

  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  fetchingUserData: boolean;
  setFetchingUserData: Dispatch<SetStateAction<boolean>>;
  fetchingUserDataError: string;
  setFetchingUserDataError: Dispatch<SetStateAction<string>>;
}

export const userContext = createContext<UserContextTypes | null>(null);
