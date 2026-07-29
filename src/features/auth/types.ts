export type StepNumber = 1 | 2 | 3;

export type FlowSubStep = "EMAIL_INPUT" | "OTP_INPUT";

export interface SignupFormData {
  email: string;
  otp: string;
  fullName: string;
  businessName: string;
  businessCategory: string;
  country: string;
  whatsappNumber: string;
  workspaceSlug: string;
  password: string;
  confirmPassword: string;
}

export interface VerificationResponse {
  success: boolean;
  message?: string;
}