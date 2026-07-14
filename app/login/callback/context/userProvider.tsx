"use client";

import { ReactNode, useState } from "react";
import { userContext } from "./userContext";
import { User } from "@globals";

export default function UserProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState("Completing identity login...");
  const [exchangeError, setExchangeError] = useState("");

  const [user, setUser] = useState<User | null>(null);
  const [fetchingUserData, setFetchingUserData] = useState(false);
  const [fetchingUserDataError, setFetchingUserDataError] = useState("");

  return (
    <userContext.Provider
      value={{
        status,
        setStatus,
        exchangeError,
        setExchangeError,
        user,
        setUser,
        fetchingUserData,
        setFetchingUserData,
        fetchingUserDataError,
        setFetchingUserDataError,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
