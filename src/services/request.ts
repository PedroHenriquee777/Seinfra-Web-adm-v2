import { api } from "./api";

export function createOrders(data: any) {
  return api.post("/novaSolicitacao", data);
}

export function listOrders(data: any) {
  return api.get("/minhas-solicitacao", data);
}

export function generatePDFRequest() {
  return api.get("/gerarPdfSolicitacoes", { responseType: "blob" });
}