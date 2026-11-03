// Badge.css.ts
import { recipe } from "@vanilla-extract/recipes";
import type { RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../tokens.css";

export const badgeStyle = recipe({
  base: {
    fontFamily: vars.font.body,
    fontSize: vars.fontSize.sm,
    fontWeight: 600,
    borderRadius: vars.borderRadius.full,
    padding: `${vars.space.xs} ${vars.space.sm}`,
    display: "inline-flex",
  },
  variants: {
    variant: {
      success: {
        backgroundColor: vars.color.successBg,
        color: vars.color.successText,
      },
      warning: {
        backgroundColor: vars.color.warningBg,
        color: vars.color.warningText,
      },
      error: {
        backgroundColor: vars.color.errorBg,
        color: vars.color.errorText,
      },
    },
  },
});
export type BadgeVariants = RecipeVariants<typeof badgeStyle>;
