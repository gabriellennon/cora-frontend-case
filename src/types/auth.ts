export interface User {
  id: string;
  name: string;
  cpf: string;
  email: string;
}

export interface SignInCredentials {
  cpf: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextData extends AuthState {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
}
