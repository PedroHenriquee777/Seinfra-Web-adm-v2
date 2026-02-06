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
    address: order.address,
    reference: order.reference,
    problem: order.description,
    dateRequest: order.creation_date ? new Date(order.creation_date).toLocaleDateString("pt-BR") : "",
    dateRequestConcluded: order.concluded_date ? new Date(order.concluded_date).toLocaleDateString("pt-BR") : "",
    state: statusMap[order.status] ?? "new",
  };
}