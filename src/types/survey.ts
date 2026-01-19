export interface SurveyFormData {
  email: string;
  affordable: string;
  cleanup: string;
  sticky: string;
  stretchiness: string;
  skinIrritation: string;
  easyToMake: string;
  storageStability: string;
  improvements: string[];
  otherImprovement: string;
  otherComments: string;
}

export interface SurveyResponse {
  success: boolean;
  message?: string;
}
