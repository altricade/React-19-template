// Window augmentation for TypeScript to recognize global state injection
declare global {
  interface Window {
    __INITIAL_STATE__: any;
  }
}

// API response types
export interface ApiResponse<T> {
  data: T;
  status: number;
  success: boolean;
  message?: string;
}

export interface ErrorResponse {
  error: string;
  status: number;
  details?: Record<string, string>;
}
