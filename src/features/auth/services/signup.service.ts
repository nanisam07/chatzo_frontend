import { SignupFormData, VerificationResponse } from "../types";

export const sendVerificationCode = async (email: string): Promise<VerificationResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  if (!email || !email.includes("@")) {
    return { success: false, message: "Invalid email address." };
  }
  return { success: true };
};

export const verifyOtp = async (email: string, otp: string): Promise<VerificationResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  if (otp === "123456") {
    return { success: true };
  }
  return { success: false, message: "Invalid verification code. Use 123456." };
};

export const createWorkspace = async (
  data: Partial<SignupFormData>
): Promise<VerificationResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true };
};

export const completeOnboarding = async (
  data: SignupFormData
): Promise<VerificationResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { success: true };
};