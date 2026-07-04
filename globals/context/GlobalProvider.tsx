"use client";

import { ReactNode, useState } from "react";

import { globalContext } from "./GlobalContext";
import { User } from "../types/user.type";
import "@global-components/icons";

export default function GlobalProvider({ children }: { children: ReactNode }) {
  const [sideBarOpen, setSideBarOpen] = useState(true);

  const [user, setUser] = useState<User | null>(null);

  return (
    <globalContext.Provider
      value={{
        sideBarOpen,
        setSideBarOpen,
        user,
        setUser,
      }}
    >
      {children}
    </globalContext.Provider>
  );
}
