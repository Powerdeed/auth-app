"use client";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

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
          <div className="w-full">
            Email:
            <input
              type="email"
              className="input-style w-full"
              value={state.userCredentials ? state.userCredentials.email : ""}
              disabled={state.loading}
              onChange={(e) =>
                actions.updateUserCredentials("email", e.target.value)
              }
            />
          </div>

          <div className="w-full">
            Password:
            <div className="wrapped-input-style">
              <input
                type={state.isVisible ? "text" : "password"}
                className="w-full outline-none"
                value={
                  state.userCredentials ? state.userCredentials.password : ""
                }
                disabled={state.loading}
                onChange={(e) =>
                  actions.updateUserCredentials("password", e.target.value)
                }
              />

              <FontAwesomeIcon
                className="cursor-pointer text-(--primary-grey)"
                icon={state.isVisible ? faEye : faEyeSlash}
                onClick={actions.toggleVisibility}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                id="terms"
                checked={state.isChecked}
                onChange={actions.handleRememberMe}
              />
              <label htmlFor="terms">Remember me</label>
            </div>

            <Link href="/forgot-password" className="text-style__link">
              Forgot Password
            </Link>
          </div>

          <Button
            buttonText={state.loading ? "Logging in..." : "Login"}
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
