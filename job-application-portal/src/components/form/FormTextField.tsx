import React from "react";
import { useFormContext, get } from "react-hook-form";

interface FormTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export const FormTextField: React.FC<FormTextFieldProps> = ({ name, label, type = "text", ...props }) => {
  const { register, formState: { errors } } = useFormContext();
  const error = get(errors, name);
  const errorMessage =
    typeof error === "object" && error !== null && "message" in error && typeof error.message === "string"
      ? error.message
      : undefined;
  const errorId = `${name}-error`;

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor={name} style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>
        {label}
      </label>
      <input
        id={name}
        type={type}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...register(name)}
        {...props}
        style={{
          width: "100%",
          padding: "0.5rem",
          borderColor: error ? "red" : "#ccc",
          borderRadius: "4px",
          borderWidth: "1px",
        }}
      />
      {errorMessage && (
        <p id={errorId} role="alert" style={{ color: "red", fontSize: "0.85rem", marginTop: "0.25rem" }}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};