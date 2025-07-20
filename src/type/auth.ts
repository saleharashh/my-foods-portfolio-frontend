import type { User } from "./user";

export interface SendOtpRequest {
  phone: string;
}
export interface SendOtpResponse {
  success: boolean;
  message?: string;
}

export interface VerifyOtpRequest {
  phone: string;
  code: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  token: string;
  user?: User;
  isNewUser: boolean;
}
