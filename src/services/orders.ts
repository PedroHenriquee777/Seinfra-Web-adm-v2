import { api } from "./api";

export function requestOrders(message: string) {
  return api.get(`/solicitarOrdens?message=${message}`);
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