import { api } from "./api";

export function requestOrders(mensagem: string) {
  return api.get(`/solicitarOrdens?mensagem=${mensagem}`);
}

export function cancelOrder(data: {
  id_order?: number;
  justification?: string;
}) {
  return api.post("/cancelarOrdem", data);
}

export function changeOrderStatus(data: {
  id_order: number;
  status: "PENDENTE" | "EM_EXECUCAO" | "CONCLUIDO";
}) {
  return api.post("/alterarStatusOrdem", data);
}