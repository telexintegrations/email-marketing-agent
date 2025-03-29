export interface EmailGenerationResponse {
  event_name: 'email_generated';
  message: string;
  status: 'success';
  username: 'mastraAiemailgen';
}

export type EmailGeneration = {
  event_name: 'Email Suggestion';
  message: string;
  status: 'success';
  username: 'Email Marketing Agent';
};
