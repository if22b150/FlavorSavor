export interface User {
  email: string;
  verified: boolean;
  token?: string;
  role: ERole;
}

export enum ERole {
  CUSTOMER = "customer",
  ADMIN = "admin"
}
