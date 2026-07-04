"use client";

import { ReactNode } from "react";

type ButtonType = "primary" | "light" | "red";

type ButtonProps = {
  buttonText: string;
  buttonType?: ButtonType;
  clickAction?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  icon?: ReactNode;
  children?: ReactNode;
  disabled?: boolean;
};

const buttonTypeClassNames: Record<ButtonType, string> = {
  primary: "bg-(--primary-blue) hover:bg-(--secondary-blue) text-white",
  light:
    "bg-white hover:bg-(--terciary-grey)/40 border border-(--secondary-blue) text-(--primary-blue)",
  red: "bg-(--primary-red) hover:bg-(--secondary-red) text-white",
};

export default function Button({
  buttonText,
  buttonType = "primary",
  clickAction,
  type = "button",
  className = "",
  icon,
  children,
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`
        ${className}
        relative
        buttonize
        py-3 px-4 rounded-[10px] text-style__small-text
        disabled:cursor-not-allowed disabled:border-(--secondary-grey) disabled:bg-(--secondary-grey) disabled:text-white disabled:opacity-70 disabled:hover:bg-(--secondary-grey)
        ${buttonTypeClassNames[buttonType]}
      `}
      onClick={clickAction}
      disabled={disabled}
    >
      <div
        className={
          icon || children ? "flex justify-center items-center gap-2" : ""
        }
      >
        {icon}
        <div>{buttonText}</div>
        {children}
      </div>
    </button>
  );
}

export function Buttonize({
  clickFunc,
  children,
  className = "",
}: {
  clickFunc?: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={clickFunc}
      className={`buttonize ${className}`}
    >
      {children}
    </button>
  );
}
