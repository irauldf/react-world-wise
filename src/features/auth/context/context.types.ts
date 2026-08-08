import type { ReactNode } from "react";

export interface AuthContextType {
  user: User | null;
  isLoggingIn: boolean;
  isAuthenticated: boolean;
  errorMessage: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface User {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export interface AuthProviderProps {
  children: ReactNode;
}
