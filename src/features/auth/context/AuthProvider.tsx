import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthProviderProps } from "./context.types";
import { AuthActions, initialState, reducer } from "../reducers";
import { parseErrorMessage } from "@/shared/utils";

import * as authService from "../services";

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function login(email: string, password: string) {
    dispatch({ type: AuthActions.LoginStarted });

    try {
      const userResp = await authService.login(email, password);
      dispatch({ type: AuthActions.LoginSucceeded, payload: userResp });
    } catch (error) {
      dispatch({
        type: AuthActions.LoginFailed,
        payload: parseErrorMessage(error),
      });
    }
  }

  function logout() {
    dispatch({ type: AuthActions.Logout });
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isLoggingIn: state.isLoggingIn,
        isAuthenticated: state.isAuthenticated,
        errorMessage: state.errorMessage,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
