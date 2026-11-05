import React, { useState } from "react";
import { useForm, FormProvider, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  jobApplicationSchema,
  type JobApplicationFormValues,
} from "./features/job-application/schemas/jobApplication.schema";
import { Step1PersonalDetails } from "./features/job-application/components/Step1PersonalDetails";
import { Step2Education } from "./features/job-application/components/Step2Education";
import { Step3Experience } from "./features/job-application/components/Step3Experience";
import { Step4ApplicationDetails } from "./features/job-application/components/Step4ApplicationDetails";
import { Step5ReviewSubmit } from "./features/job-application/components/Step5ReviewSubmit";
import { submitJobApplication } from "./features/job-application/services/mockSubmitApi";

const STEP_FIELDS: Record<number, string[]> = {
  0: ["fullName", "email", "phone", "dob", "currentCity"],
  1: ["educationList"],
  2: [
    "applicantType",
    "availableToJoinDays",
    "totalExperienceYears",
    "noticePeriodDays",
    "workHistory",
  ],
  3: ["positionApplied", "expectedJoiningDate", "portfolioLink", "coverNote", "acceptTerms"],
};

export const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [mockOutcome, setMockOutcome] = useState<"success" | "field_error" | "server_error">("field_error");
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(null);

  const methods = useForm<JobApplicationFormValues>({
    resolver: zodResolver(jobApplicationSchema) as any,
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      dob: "",
      currentCity: "",
      educationList: [{ degree: "", institution: "", yearOfPassing: 2024, percentage: 85 }],
      applicantType: "fresher",
      availableToJoinDays: 15,
      positionApplied: "Frontend Engineer",
      expectedJoiningDate: "",
      portfolioLink: "",
      coverNote: "",
      acceptTerms: true,
    } as JobApplicationFormValues,
  });

  const { handleSubmit, trigger, setError, clearErrors, formState: { isSubmitting } } = methods;

  // Helper to locate the step corresponding to an errored field
  const findStepForField = (fieldName: string): number => {
    for (const [stepIndex, fields] of Object.entries(STEP_FIELDS)) {
      if (fields.some((f) => fieldName.startsWith(f))) {
        return Number(stepIndex);
      }
    }
    return 0;
  };

  const handleNext = async () => {
    setServerErrorMessage(null); // Clear server banner when user moves forward
    const fieldsToValidate = STEP_FIELDS[currentStep];
    const isStepValid = await trigger(fieldsToValidate as any);
    if (isStepValid) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setTimeout(() => {
        const firstInvalid = document.querySelector('[aria-invalid="true"]') as HTMLElement;
        firstInvalid?.focus();
      }, 50);
    }
  };

  const handlePrev = () => {
    setServerErrorMessage(null);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit: SubmitHandler<JobApplicationFormValues> = async (data) => {
    setServerErrorMessage(null);
    clearErrors();

    const response = await submitJobApplication(data, mockOutcome);

    if (response.status === "FIELD_ERROR") {
      let targetStep = 0;

      // 1. Map server field errors to React Hook Form state
      Object.entries(response.errors).forEach(([field, message], index) => {
        setError(field as any, { type: "server", message });

        // Target the step of the first field error
        if (index === 0) {
          targetStep = findStepForField(field);
        }
      });

      // 2. Jump to the step containing the field error
      setCurrentStep(targetStep);

      // 3. Move focus to the invalid field for accessibility
      setTimeout(() => {
        const firstInvalid = document.querySelector('[aria-invalid="true"]') as HTMLElement;
        firstInvalid?.focus();
      }, 100);

    } else if (response.status === "SERVER_ERROR") {
      // Set global server error banner for 500 status code
      setServerErrorMessage(response.message);

      // Shift focus to the error banner so screen readers announce it
      setTimeout(() => {
        const errorBanner = document.getElementById("server-error-banner");
        errorBanner?.focus();
      }, 50);

    } else {
      alert(response.message);
    }
  };

  return (
    <div style={{ maxWidth: "650px", margin: "2rem auto", fontFamily: "sans-serif", padding: "1rem" }}>
      <h1>Careers Portal - Job Application</h1>

      <div style={{ background: "#eef7ff", padding: "0.75rem", marginBottom: "1.5rem", borderRadius: "4px" }}>
        <label style={{ fontWeight: 600, marginRight: "0.5rem" }}>Simulate API Mock Outcome: </label>
        <select value={mockOutcome} onChange={(e) => setMockOutcome(e.target.value as any)}>
          <option value="success">Success (200)</option>
          <option value="field_error">Field Validation Error (400)</option>
          <option value="server_error">Server Error (500)</option>
        </select>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Accessible Global Server Error Banner (500 Case) */}
          {serverErrorMessage && (
            <div
              id="server-error-banner"
              tabIndex={-1}
              role="alert"
              style={{
                background: "#ffebee",
                color: "#c62828",
                border: "1px solid #ef5350",
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "4px",
                outline: "none",
              }}
            >
              <strong>Submission Error:</strong> {serverErrorMessage}
            </div>
          )}

          {currentStep === 0 && <Step1PersonalDetails />}
          {currentStep === 1 && <Step2Education />}
          {currentStep === 2 && <Step3Experience />}
          {currentStep === 3 && <Step4ApplicationDetails />}
          {currentStep === 4 && <Step5ReviewSubmit />}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
            {currentStep > 0 && (
              <button type="button" onClick={handlePrev} disabled={isSubmitting}>
                Back
              </button>
            )}
            {currentStep < 4 ? (
              <button type="button" onClick={handleNext}>
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                style={{ background: "#2e7d32", color: "white", padding: "0.5rem 1rem", border: "none", borderRadius: "4px" }}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default App;