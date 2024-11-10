import { createContext, useContext, useCallback, useState } from 'react';
import { AuthContextData, AuthState, SignInCredentials } from '../types/auth';
import { api } from '../services/api';
import { login } from '../services/login.service';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AUTH_STORAGE_KEY = '@Cora:auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AuthState>(() => {
    const storedData = localStorage.getItem(AUTH_STORAGE_KEY);

    if (storedData) {
      const { user, token } = JSON.parse(storedData);

      if (token) {
        // api.defaults.headers.authorization = `Bearer ${token}`;
        api.defaults.headers.token = token;
        return { user, isAuthenticated: true, isLoading: false };
      }
    }

    return { user: null, isAuthenticated: false, isLoading: false };
  });

  const signIn = useCallback(async ({ cpf, password }: SignInCredentials) => {
    try {
      const response = await login({ cpf, password });

      const { user, token } = response.data;

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user, token }));
      // api.defaults.headers.authorization = `Bearer ${token}`;
      api.defaults.headers.token = token;

      setData({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      console.error(error);
      throw new Error('Credenciais inválidas');
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    // api.defaults.headers.authorization = '';
    api.defaults.headers.token = '';
    setData({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...data,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
}
