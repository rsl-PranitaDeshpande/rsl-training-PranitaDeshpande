// Card.css.ts
import { style } from "@vanilla-extract/css";
import { vars } from "../../tokens.css";

export const cardStyle = style({
  backgroundColor: vars.color.bgCard,
  borderRadius: vars.borderRadius.lg,
  padding: vars.space.lg,
  boxShadow: vars.shadow.md,
  border: `1px solid ${vars.color.border}`,
});
