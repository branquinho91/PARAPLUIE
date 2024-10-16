import { ReactNode } from "react";

export interface IUser {
  id: number;
  profile: string;
  name: string;
  document: string;
  fullAddress: string;
  email: string;
  password: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthContext {
  user: IUser | null;
  login: (userData: IUser) => void;
  logout: () => void;
}

export interface IAuthProviderProps {
  children: ReactNode;
}
