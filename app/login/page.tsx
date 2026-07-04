"use client";

import { LoginView } from "./components/LoginView";
import LoginProvider from "./context/LoginProvider";

export default function Login() {
  return (
    <LoginProvider>
      <LoginView />
    </LoginProvider>
  );
}
