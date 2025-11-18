import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import apiClient from "../api/apiClient";
import { Usuario } from "../models/usuario";

interface User extends Usuario {
  token: string;
}

interface SessionContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const SessionProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      // 🔹 Se o backend espera "username" (muito comum em Spring Security):
      const payload = { username: email, password };
      // Se ele realmente espera "email", troca pra: { email, password }

      const response = await apiClient.post("/auth/login", payload);

      // 🔹 Esperando algo como: { token, usuario }
      const { token, usuario } = response.data as {
        token: string;
        usuario: Usuario;
      };

      const userData: User = {
        ...usuario,
        token,
      };

      // 🔹 Salva no AsyncStorage
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      if (usuario.idUsuario != null) {
        await AsyncStorage.setItem("userId", usuario.idUsuario.toString());
      }

      setUser(userData);

      return true;
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        // credenciais inválidas
        return false;
      }

      console.error("[SessionProvider][login] Erro inesperado no login:", error);
      return false;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("userId");
    setUser(null);
  };

  return (
    <SessionContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export { SessionProvider, useSession };

