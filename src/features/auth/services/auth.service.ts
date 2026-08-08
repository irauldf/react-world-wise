import type { User } from "../context";
import { FAKE_USER } from "../reducers";

export function login(email: string, password: string): Promise<User> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (FAKE_USER.email === email && FAKE_USER.password === password) {
        resolve(FAKE_USER);
      } else {
        reject("Wrong credentials");
      }
    }, 1000);
  });
}

export function logout() {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}
