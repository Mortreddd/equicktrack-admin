export interface Response {
  code: number;
  message: string;
}

export interface ErrorResponse {
  date?: string;
  message?: string;
  details?: string;
}
