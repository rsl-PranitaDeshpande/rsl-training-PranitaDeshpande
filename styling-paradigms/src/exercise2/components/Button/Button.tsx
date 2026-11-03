import React, { type ButtonHTMLAttributes } from "react";
import { buttonStyle } from "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "danger";
export type ButtonSize = "small" | "large";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "small",
  className,
  children,
  ...props
}) => {
  const buttonClasses = [buttonStyle({ variant, size }), className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};
