import type { JobApplicationFormValues } from "../schemas/jobApplication.schema";

export type ApiResponse =
  | { status: "SUCCESS"; message: string }
  | { status: "FIELD_ERROR"; errors: Record<string, string> }
  | { status: "SERVER_ERROR"; message: string };

export const submitJobApplication = async (
  data: JobApplicationFormValues,
  outcomeMode: "success" | "field_error" | "server_error"
): Promise<ApiResponse> => {
  void data;
  await new Promise((resolve) => setTimeout(resolve, 1500)); // 1.5s simulated network lag

  if (outcomeMode === "field_error") {
    return {
      status: "FIELD_ERROR",
      errors: {
        email: "This email address is already registered in our careers database.",
      },
    };
  }

  if (outcomeMode === "server_error") {
    return {
      status: "SERVER_ERROR",
      message: "Internal Server Error (500): Failed to save submission. Please try again later.",
    };
  }

  return {
    status: "SUCCESS",
    message: "Application successfully submitted! Reference ID: APP-2026-8841",
  };
};