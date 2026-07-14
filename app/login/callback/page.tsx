"use client";

import UserProvider from "./context/userProvider";
import Callback from "./components/Callback";

export default function LoginCallbackPage() {
  return (
    <UserProvider>
      <Callback />
    </UserProvider>
  );
}
