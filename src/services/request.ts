import { api } from "./api";

export function createOrders(data: any) {
  return api.post("/novaSolicitacao", data);
}

export function listOrders(data: any) {
  return api.get("/minhas-solicitacao", data);
}

export function generatePDFRequest(startDate: string, endDate: string) {
  return api.get("/gerarPdfSolicitacoes", {
    params: {
      startDate,
      endDate,
    },
    responseType: "blob",
  });
}