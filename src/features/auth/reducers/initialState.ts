import type { User } from "../context";
import type { AuthState } from "./reducer.types";

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoggingIn: false,
  errorMessage: "",
};

export const FAKE_USER: User = {
  avatar: "https://i.pravatar.cc/100?u=zz",
  email: "rdelgado@gmail.com",
  name: "Raúl",
  password: "qwerty",
};
