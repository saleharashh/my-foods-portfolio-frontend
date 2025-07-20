export interface User {
  id: string;
  name: string;
  address: string;
  phone: string;
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
