import { createContext, useState, FC } from "react";
import { IUser, IAuthContext, IAuthProviderProps } from "../interfaces/interfaces";

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const login = (userData: IUser) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    // navigation chamar a tela de login
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
