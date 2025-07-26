export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  token:string;
  refreshtoken:string;
  createAt: Date;
}

export type UpdateUserResponse = {
  success: boolean;
  message?: string;
};

export type UpdateUserBody = {
  name: string;
  address: string;
};

export type UserFormData = {
  name: string;
  phone: string;
  address: string;
};
