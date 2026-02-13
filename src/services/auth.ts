import { api } from "./api";

export function login(data: { cpf: string; password: string }) {
    return api.post ("/login", data)
};

export function registerAdmin(data: {
  cpf: string;
  password: string;
  phone: string;
}) {
  return api.post("/registro-admin", data);
}

export function logout() {
  return api.post("/logout")
}

export function getMe() {
  return api.get("/me")
}