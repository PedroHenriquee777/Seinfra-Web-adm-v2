import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { OsCard, OsStatus } from "./constants";
import { extractCategory } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapOrderToOsCard(order: any): OsCard {
    const statusMap: Record<string, OsStatus> = {
      PENDENTE: "new",
      EM_EXECUCAO:"inProgress",
      CONCLUIDO: "completed",
      CANCELADO: "canceled",
    };
  
    return {
      category: extractCategory(order.description || ""),
      address: order.address,
      reference: order.reference,
      problem: order.description.replace(/^\[.*?\]\s*/, ""),
      dateRequest: order.creation_date ? new Date(order.creation_date).toLocaleDateString("pt-BR") : "",
      dateRequestConcluded: order.concluded_date ? new Date(order.concluded_date).toLocaleDateString("pt-BR") : "",
      status: statusMap[order.status] ?? "new",
      id_order: order.id_order,
      users: order.users ? {
        name: order.users.name || "",
        phone: order.users.phone || "",
        cpf: order.users.cpf || "",
      } : undefined,
    };
  }