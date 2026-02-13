import { api } from "./api";

export function loginAdmin(data: { cpf: string; password: string }) {
    return api.post ("/login-admin", data)
};

export function registerAdmin(data: {
  cpf: string;
  name: string;
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