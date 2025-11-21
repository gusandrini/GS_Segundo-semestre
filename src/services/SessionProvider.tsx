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

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log("==============================================");
    console.log("[LOGIN] Iniciando login...");
    console.log("[LOGIN] Payload enviado:", { nmEmail: email, nmSenha: password });

    try {
      const payload = { nmEmail: email, nmSenha: password };

      console.log("[LOGIN] Chamando endpoint: /api/auth/login");

      const response = await apiClient.post("/api/auth/login", payload);

      console.log("[LOGIN] Resposta crua do backend:", response.data);

      const data = response.data;

      let token: string | undefined;

      if (typeof data === "string") {
        token = data;
      } else if (data && typeof data === "object") {
        token = data.token;
      }

      console.log("[LOGIN] Token extraído:", token);

      if (!token) {
        console.error("[LOGIN] ERRO: backend não retornou token!");
        return false;
      }

      const usuarioBack = (data.usuario as Usuario | undefined) ?? null;

      console.log("[LOGIN] Usuario retornado pelo backend:", usuarioBack);

      const baseUsuario: Usuario =
        usuarioBack ?? {
          idUsuario: undefined,
          nmCliente: "",
          nmEmail: email,
          nmSenha: "",
          funcoes: [],
        };

      console.log("[LOGIN] baseUsuario final:", baseUsuario);

      const userData: User = {
        ...baseUsuario,
        token,
      };

      console.log("[LOGIN] Salvando no AsyncStorage:", userData);

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(userData));

      if (baseUsuario.idUsuario != null) {
        await AsyncStorage.setItem("userId", baseUsuario.idUsuario.toString());
        console.log("[LOGIN] userId salvo:", baseUsuario.idUsuario);
      } else {
        console.warn("[LOGIN] ATENÇÃO: idUsuario é NULL — Perfil não vai carregar!");
      }

      setUser(userData);

      console.log("[LOGIN] Login COMPLETO ✔");
      console.log("==============================================");

      return true;
    } catch (error: any) {
      console.log("==============================================");
      console.log("[LOGIN] ERRO NO LOGIN");
      console.log("Status:", error?.response?.status);
      console.log("URL:", error?.config?.url);
      console.log("Resposta:", error?.response?.data);
      console.log("==============================================");

      if (error?.response?.status === 401) {
        return false;
      }

      return false;
    }
  };

  const logout = async () => {
    console.log("[LOGOUT] Limpando sessão...");
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("userId");
    setUser(null);
    console.log("[LOGOUT] Feito ✔");
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

