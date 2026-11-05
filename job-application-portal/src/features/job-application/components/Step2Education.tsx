import React from "react";
import { useFormContext, useFieldArray, get } from "react-hook-form";
import { FormTextField } from "../../../components/form/FormTextField";

export const Step2Education: React.FC = () => {
  const { control, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "educationList",
  });

  const arrayError = (get(errors, "educationList.root") || get(errors, "educationList")) as { message?: string } | undefined;

  return (
    <fieldset style={{ border: "none", padding: 0 }}>
      <legend><h2>Step 2: Education Details</h2></legend>

      {fields.map((field, index) => (
        <div key={field.id} style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem", borderRadius: "6px" }}>
          <h3>Education #{index + 1}</h3>
          <FormTextField name={`educationList.${index}.degree`} label="Degree / Qualification" />
          <FormTextField name={`educationList.${index}.institution`} label="Institution / University" />
          <FormTextField name={`educationList.${index}.yearOfPassing`} label="Year of Passing" type="number" />
          <FormTextField name={`educationList.${index}.percentage`} label="Percentage / CGPA" type="number" step="0.1" />

          {fields.length > 1 && (
            <button type="button" onClick={() => remove(index)} style={{ color: "red", background: "none", border: "none", cursor: "pointer" }}>
              Remove Qualification
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ degree: "", institution: "", yearOfPassing: 2024, percentage: 80 })}
        style={{ marginBottom: "1rem", padding: "0.5rem 1rem" }}
      >
        + Add Another Qualification
      </button>

      {arrayError && !Array.isArray(arrayError) && (
        <p role="alert" style={{ color: "red" }}>{arrayError.message as string}</p>
      )}
    </fieldset>
  );
};