import React from "react";
import { useFormContext } from "react-hook-form";
import { FormSelectField } from "../../../components/form/FormSelectField";
import { FormTextField } from "../../../components/form/FormTextField";

export const Step4ApplicationDetails: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <fieldset style={{ border: "none", padding: 0 }}>
      <legend><h2>Step 4: Application Details</h2></legend>

      <FormSelectField
        name="positionApplied"
        label="Position Applied For"
        options={[
          { label: "Frontend Engineer", value: "Frontend Engineer" },
          { label: "Backend Engineer", value: "Backend Engineer" },
          { label: "Full Stack Engineer", value: "Full Stack Engineer" },
        ]}
      />

      <FormTextField name="expectedJoiningDate" label="Expected Joining Date" type="date" />
      <FormTextField name="portfolioLink" label="Portfolio / GitHub Link (Optional)" type="url" />

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="coverNote" style={{ display: "block", fontWeight: 600, marginBottom: "0.25rem" }}>
          Cover Note (Optional)
        </label>
        <textarea
          id="coverNote"
          {...register("coverNote")}
          rows={4}
          style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", borderColor: "#ccc" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          <input type="checkbox" {...register("acceptTerms")} /> I accept the terms and conditions
        </label>
        {errors.acceptTerms && (
          <p role="alert" style={{ color: "red", fontSize: "0.85rem" }}>
            {errors.acceptTerms.message as string}
          </p>
        )}
      </div>
    </fieldset>
  );
};