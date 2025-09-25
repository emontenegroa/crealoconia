export const logFormSubmissionFlow = (step: string, data?: any) => {
  console.log(`🔍 [FORM DEBUG] ${step}:`, data);
};

export const logEmailFlow = (step: string, data?: any) => {
  console.log(`📧 [EMAIL DEBUG] ${step}:`, data);
};

export const logNavigationFlow = (step: string, data?: any) => {
  console.log(`🧭 [NAVIGATION DEBUG] ${step}:`, data);
};