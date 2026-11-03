import React from "react";
import { badgeStyle } from "./Badge.css";

export type BadgeVariant = "success" | "warning" | "error";

export type BadgeProps = {
  variant?: BadgeVariant;
  children: React.ReactNode;
};

export const Badge: React.FC<BadgeProps> = ({ variant = "success", children }) => (
  <span className={badgeStyle({ variant })}>{children}</span>
);
