import { z } from "zod";

// Helper to calculate age from Date of Birth
const getAge = (dobString: string): number => {
  const today = new Date();
  const birthDate = new Date(dobString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// 1. Personal Details (Cross-field rule: Candidate must be 18+)
export const personalDetailsSchema = z.object({
  fullName: z.string().min(2, { error: "Full name must be at least 2 characters" }),
  email: z.email({ error: "Please enter a valid email address" }),
  phone: z.string().regex(/^[0-9]{10}$/, { error: "Phone number must be exactly 10 digits" }),
  dob: z.string().min(1, { error: "Date of birth is required" }),
  currentCity: z.string().min(2, { error: "Current city is required" }),
}).refine((data) => getAge(data.dob) >= 18, {
  error: "Candidate must be at least 18 years old",
  path: ["dob"],
});

// 2. Education Item Schema
export const educationItemSchema = z.object({
  degree: z.string().min(1, { error: "Degree is required" }),
  institution: z.string().min(1, { error: "Institution is required" }),
  yearOfPassing: z.coerce
    .number({ error: "Year is required" })
    .min(1970, { error: "Invalid year" })
    .max(new Date().getFullYear(), { error: "Year cannot be in the future" }),
  percentage: z.coerce
    .number({ error: "Percentage is required" })
    .min(0, { error: "Min 0%" })
    .max(100, { error: "Max 100%" }),
});

export const educationStepSchema = z.object({
  educationList: z
    .array(educationItemSchema)
    .min(1, { error: "At least one education entry is required" }),
});

// 3. Experience Schemas (Discriminated Union + Cross-field rule: To date after From date)
const workHistoryItemSchema = z.object({
  companyName: z.string().min(1, { error: "Company name is required" }),
  role: z.string().min(1, { error: "Role is required" }),
  fromDate: z.string().min(1, { error: "From date is required" }),
  toDate: z.string().min(1, { error: "To date is required" }),
}).refine((data) => new Date(data.toDate) >= new Date(data.fromDate), {
  error: "End date ('To') must be after or equal to Start date ('From')",
  path: ["toDate"],
});

export const fresherSchema = z.object({
  applicantType: z.literal("fresher"),
  availableToJoinDays: z.coerce
    .number({ error: "Days required" })
    .min(0, { error: "Must be 0 or more days" }),
});

export const experiencedSchema = z.object({
  applicantType: z.literal("experienced"),
  totalExperienceYears: z.coerce
    .number({ error: "Years required" })
    .min(0.5, { error: "Experience must be at least 0.5 years" }),
  noticePeriodDays: z.coerce
    .number({ error: "Notice period required" })
    .min(0, { error: "Notice period cannot be negative" }),
  workHistory: z
    .array(workHistoryItemSchema)
    .min(1, { error: "At least one previous company is required for experienced candidates" }),
});

export const experienceStepSchema = z.discriminatedUnion("applicantType", [
  fresherSchema,
  experiencedSchema,
]);

// 4. Application Details (Cross-field rule: Expected joining date in the future)
export const applicationDetailsSchema = z.object({
  positionApplied: z.string().min(1, { error: "Please select a position" }),
  expectedJoiningDate: z.string().min(1, { error: "Expected joining date is required" }),
  portfolioLink: z.string().optional(),
  coverNote: z.string().optional(),
  acceptTerms: z.literal(true, { error: "You must accept the terms and conditions" }),
}).refine((data) => {
  if (!data.expectedJoiningDate) return true;
  const joining = new Date(data.expectedJoiningDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return joining > today;
}, {
  error: "Expected joining date must be in the future",
  path: ["expectedJoiningDate"],
});

// 5. Composed Master Schema
export const jobApplicationSchema = z
  .object({
    ...personalDetailsSchema.shape,
    ...educationStepSchema.shape,
    ...applicationDetailsSchema.shape,
  })
  .and(experienceStepSchema);

// Inferred TypeScript Type - Source of Truth
export type JobApplicationFormValues = z.infer<typeof jobApplicationSchema>;