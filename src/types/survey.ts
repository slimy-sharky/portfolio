export interface SurveyFormData {
  name: string;
  email: string;
  product: string;
  rating: string;
  message: string;
}

export interface SurveyResponse {
  success: boolean;
  error?: string;
}
