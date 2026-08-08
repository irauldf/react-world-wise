import type { User } from "../context";
import type { AuthActions } from "./actions";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoggingIn: boolean;
  errorMessage: string;
}

export type AuthAction =
  | { type: typeof AuthActions.LoginStarted }
  | { type: typeof AuthActions.LoginSucceeded; payload: User }
  | { type: typeof AuthActions.LoginFailed; payload: string }
  | { type: typeof AuthActions.Logout };
