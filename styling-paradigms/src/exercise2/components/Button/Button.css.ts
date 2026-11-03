import { recipe } from "@vanilla-extract/recipes";
import type { RecipeVariants } from "@vanilla-extract/recipes";
import { vars } from "../../tokens.css";

export const buttonStyle = recipe({
  base: {
    fontFamily: vars.font.body,
    fontWeight: 600,
    borderRadius: vars.borderRadius.md,
    border: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s ease-in-out",
    outline: "none",
    selectors: {
      "&:focus-visible": {
        boxShadow: `0 0 0 3px ${vars.color.border}, 0 0 0 5px ${vars.color.primary}`,
      },
      "&:disabled": {
        backgroundColor: vars.color.disabledBg,
        color: vars.color.disabledText,
        cursor: "not-allowed",
      },
    },
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: vars.color.primary,
        color: "#ffffff",
        selectors: {
          "&:hover:not(:disabled)": {
            backgroundColor: vars.color.primaryHover,
          },
        },
      },
      secondary: {
        backgroundColor: vars.color.secondary,
        color: "#ffffff",
        selectors: {
          "&:hover:not(:disabled)": {
            backgroundColor: vars.color.secondaryHover,
          },
        },
      },
      danger: {
        backgroundColor: vars.color.danger,
        color: "#ffffff",
        selectors: {
          "&:hover:not(:disabled)": { backgroundColor: vars.color.dangerHover },
        },
      },
    },
    size: {
      small: {
        padding: `${vars.space.xs} ${vars.space.sm}`,
        fontSize: vars.fontSize.sm,
      },
      large: {
        padding: `${vars.space.md} ${vars.space.lg}`,
        fontSize: vars.fontSize.lg,
      },
    },
  },
  defaultVariants: { variant: "primary", size: "small" },
});

export type ButtonVariants = RecipeVariants<typeof buttonStyle>;
