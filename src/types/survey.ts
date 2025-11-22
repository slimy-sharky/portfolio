export interface SurveyFormData {
  email: string;
  sticky: string;
  chewy: string;
  fluffy: string;
  lumpFree: string;
  affordable: string;
  easyToMake: string;
  improvements: string[];
  otherComments: string;
}

export interface SurveyResponse {
  success: boolean;
  error?: string;
}
