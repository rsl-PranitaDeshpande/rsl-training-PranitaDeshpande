// Card.tsx
import React from "react";
import { cardStyle } from "./Card.css";

export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={cardStyle}>{children}</div>
);
