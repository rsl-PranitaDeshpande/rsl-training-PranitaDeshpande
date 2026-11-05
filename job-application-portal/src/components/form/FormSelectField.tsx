import React from "react";
import { useFormContext, get } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface FormSelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: Option[];
}

export const FormSelectField: React.FC<FormSelectFieldProps> = ({ name, label, options, ...props }) => {
  const { register, formState: { errors } } = useFormContext();
  const error = get(errors, name) as { message?: string } | undefined;
  const errorId = `${name}-error`;

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor={name} style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>
        {label}
      </label>
      <select
        id={name}
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
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} role="alert" style={{ color: "red", fontSize: "0.85rem", marginTop: "0.25rem" }}>
          {error.message as string}
        </p>
      )}
    </div>
  );
};