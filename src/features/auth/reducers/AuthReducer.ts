import { AuthActions } from "./actions";
import { type AuthAction, type AuthState } from "./reducer.types";

export function reducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActions.LoginStarted:
      return { ...state, isLoggingIn: true, errorMessage: "", user: null };
    case AuthActions.LoginSucceeded:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case AuthActions.LoginFailed:
      return { ...state, isLoggingIn: false, errorMessage: action.payload };

    case AuthActions.Logout:
      return { ...state, isAuthenticated: false, user: null };
  }
}
