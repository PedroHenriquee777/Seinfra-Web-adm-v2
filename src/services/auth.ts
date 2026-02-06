import { api } from "./api";

export function loginAdmin(data: { cpf: string; senha: string }) {
    return api.post ("/login-admin", data)
};

export function registerAdmin(data: {
  cpf: string;
  senha: string;
  telefone: string;
}) {
  return api.post("/registro-admin", data);
}