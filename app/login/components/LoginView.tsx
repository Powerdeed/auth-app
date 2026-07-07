"use client";

import Button from "@global-components/ui/Button";
import Loader from "@global-components/ui/Loader";
import { SectionTitle } from "@global-components/ui/Title";

import useLogin from "../hooks/useLogin";

import { PLATFORM_NAME } from "@lib/constants/COMPANY_NAME";

export function LoginView() {
  const { state, actions } = useLogin();

  return (
    <div className="border w-screen h-screen vertical-layout__outer items-center justify-center z-1 bg-background">
      <div className="feature-container-vertical w-100">
        <SectionTitle title={PLATFORM_NAME} style="text-center" />

        <form
          className="vertical-layout__outer text-style__body"
          onSubmit={(e) => actions.handleLogin(e)}
        >
          <p className="text-center text-style__body text-(--primary-grey)">
            Sign in through PTR Identity to access internal applications.
          </p>

          <Button
            buttonText={
              state.loading
                ? "Opening identity login..."
                : "Continue with PTR Identity"
            }
            type="submit"
            disabled={state.loading}
          >
            {state.loading && <Loader />}
          </Button>

          {state.error && (
            <div className="text-red-500 text-sm text-center">
              {state.error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
