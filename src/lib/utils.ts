import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { OsCard, OsStatus } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapOrderToOsCard(order: any): OsCard {
  const statusMap: Record<string, OsStatus> = {
    PENDENTE: "inProgress",
    CONCLUIDO: "completed",
    FINALIZADA: "completed",
    CANCELADO: "completed",
  };

  return {
    category: "Ordem de Serviço",
    reference: order.reference,
    address: order.endereco,
    problem: order.descricao,
    dateRequest: order.data_criacao ? new Date(order.data_criacao).toLocaleDateString("pt-BR") : "",
    dateRequestConcluded: order.data_conclusao ? new Date(order.data_conclusao).toLocaleDateString("pt-BR") : "",
    state: statusMap[order.status] ?? "new",
  };
}