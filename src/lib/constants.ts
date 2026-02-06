import { ClipboardList, FileText, History, Phone } from "lucide-react";

export const navItems = [
  {
    Page: "/new-os",
    Desc: "Vejas as novas ordens",
    Icon: FileText,
    Label: "Novas Ordens de Serviço",
    className: "w-component-w sm:w-[40vw] lg:w-[30vw] h-48 lg:h-auto max-h-96",
  },
  {
    Page: "/os-in-progress",
    Desc: "Veja as Ordens de Serviço em andamento",
    Icon: History,
    Label: "Ordens de Serviço em Andamento",
    className: "w-component-w sm:w-[40vw] lg:w-[30vw] h-48 lg:h-auto max-h-96",
  },
  {
    Page: "/os-completed",
    Desc: "Veja as Ordens de Serviço concluídas",
    Icon: Phone,
    Label: "Ordens de Serviço Concluídas",
    className: "w-component-w sm:w-[40vw] lg:w-[30vw] h-48 lg:h-auto max-h-96",
  },
  {
    Page: "/all-os",
    Desc: "Todas as Ordens de Serviço",
    Icon: ClipboardList,
    Label: "Últimas Ordens de Serviço",
    className: "w-component-w sm:w-[40vw] lg:w-[30vw] h-48 lg:h-auto max-h-96",
  },
];

export type OsStatus = "new" | "inProgress" | "completed";
export function extractCategory(description: string): string { const match = description.match(/^\[(.*?)\]/); return match ? match[1] : "Outro"; }

export interface OsCard {
  category: string;
  address: string;
  reference: string;
  problem: string;
  dateRequest: string;
  dateRequestConcluded: string;
  state: OsStatus;
  id_order?: number;
  applicant?: {
    name: string;
    phone: string;
    cpf: string;
  };
}