import React from "react";
import { useFormContext, useFieldArray, useWatch, get } from "react-hook-form";
import { FormSelectField } from "../../../components/form/FormSelectField";
import { FormTextField } from "../../../components/form/FormTextField";

export const Step3Experience: React.FC = () => {
  const { control, formState: { errors } } = useFormContext();
  const applicantType = useWatch({ control, name: "applicantType" });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "workHistory",
  });

  const workHistoryError = get(errors, "workHistory") as { message?: string } | undefined;

  return (
    <fieldset style={{ border: "none", padding: 0 }}>
      <legend><h2>Step 3: Experience Details</h2></legend>

      <FormSelectField
        name="applicantType"
        label="Applicant Status"
        options={[
          { label: "Fresher", value: "fresher" },
          { label: "Experienced", value: "experienced" },
        ]}
      />

      {applicantType === "fresher" ? (
        <FormTextField name="availableToJoinDays" label="Available to join (in days)" type="number" />
      ) : (
        <div>
          <FormTextField name="totalExperienceYears" label="Total Experience (Years)" type="number" step="0.5" />
          <FormTextField name="noticePeriodDays" label="Notice Period (Days)" type="number" />

          <h3>Previous Companies</h3>
          {fields.map((field, index) => (
            <div key={field.id} style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem", borderRadius: "6px" }}>
              <h4>Company #{index + 1}</h4>
              <FormTextField name={`workHistory.${index}.companyName`} label="Company Name" />
              <FormTextField name={`workHistory.${index}.role`} label="Role / Designation" />
              <FormTextField name={`workHistory.${index}.fromDate`} label="From Date" type="date" />
              <FormTextField name={`workHistory.${index}.toDate`} label="To Date" type="date" />

              {fields.length > 1 && (
                <button type="button" onClick={() => remove(index)} style={{ color: "red", background: "none", border: "none", cursor: "pointer" }}>
                  Remove Company
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ companyName: "", role: "", fromDate: "", toDate: "" })}
            style={{ marginBottom: "1rem", padding: "0.5rem 1rem" }}
          >
            + Add Previous Company
          </button>

          {workHistoryError && !Array.isArray(workHistoryError) && (
            <p role="alert" style={{ color: "red" }}>{workHistoryError.message as string}</p>
          )}
        </div>
      )}
    </fieldset>
  );
};