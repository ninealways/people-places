import { createContext } from "react";

export const LoginContext = createContext({
    isLoggedIn: false,
    userId: null,
    login: () => {},
    logout: () => {}
});