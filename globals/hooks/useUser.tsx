"use client";

import { globalContext } from "../context/GlobalContext";
import { User } from "../types/user.type";
import { useContext, useEffect } from "react";

export default function useUser() {
  const globalStates = useContext(globalContext);

  if (!globalStates)
    throw new Error("Global context must be within a provider");

  const { setUser } = globalStates;

  useEffect(() => {
    const getUser = () => {
      const storedUser = localStorage.getItem("user");

      const user: User | null = storedUser ? JSON.parse(storedUser) : null;

      setUser(user);
    };

    getUser();
  }, [setUser]);

  return {};
}
