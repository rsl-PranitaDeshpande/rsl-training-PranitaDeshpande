import React from "react";
import { useFormContext } from "react-hook-form";
import type { JobApplicationFormValues } from "../schemas/jobApplication.schema";

export const Step5ReviewSubmit: React.FC = () => {
  const { getValues } = useFormContext<JobApplicationFormValues>();
  const values = getValues();

  return (
    <div>
      <h2>Step 5: Review & Submit</h2>
      <p>Please review your details before submitting your application.</p>

      <div style={{ background: "#f9f9f9", padding: "1rem", borderRadius: "4px", maxHeight: "400px", overflowY: "auto" }}>
        <pre style={{ fontSize: "0.9rem" }}>{JSON.stringify(values, null, 2)}</pre>
      </div>
    </div>
  );
};