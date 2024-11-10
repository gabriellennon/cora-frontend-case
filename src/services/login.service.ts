import { SignInCredentials } from "../types/auth";
import { api } from "./api";

export function login({ cpf, password }: SignInCredentials){
  return api.post('/auth', {
    cpf,
    password
  });
}
