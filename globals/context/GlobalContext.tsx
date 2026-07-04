"use client";

import { User } from "../types/user.type";
import { createContext, Dispatch, SetStateAction } from "react";

type GlobalStates = {
  sideBarOpen: boolean;
  setSideBarOpen: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const globalContext = createContext<GlobalStates | null>(null);
