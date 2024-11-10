import { api } from "./api";

export function listTransactions() {
  return api.get('/list')
}
