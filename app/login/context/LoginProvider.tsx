"use client";

import { useState } from "react";
import { LoginContext } from "./LoginContext";
import { UserCredentials } from "@/globals";

export default function LoginProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isChecked, setIsChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [userCredentials, setUsercredentials] = useState<UserCredentials>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <LoginContext.Provider
      value={{
        isChecked,
        setIsChecked,
        isVisible,
        setIsVisible,
        userCredentials,
        setUsercredentials,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
