export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "",
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
  enableAiFeatures: process.env.NEXT_PUBLIC_ENABLE_AI_FEATURES === "true",
  env: process.env.NODE_ENV || "development",
};
