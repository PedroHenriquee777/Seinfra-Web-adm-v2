import BlueRetangle from "@/assets/blueRetangle.svg";
import GreenRetangle from "@/assets/greenRetangle.svg";
import YellowRetangle from "@/assets/yellowRetangle.svg";
import RedRetangle from "@/assets/redRetangle.svg"
import { Button } from "@/components/ui/button";
import type { OsCard as OsCardType, OsStatus } from "@/lib/constants";
import { OsDescDialog } from "./os-desc-dialog";
import { formatCPF } from "@/utils/format-cpf";
import { formatPhone } from "@/utils/format-phone";

interface Props {
  card: OsCardType;
  onStatusChange?: () => void;
}

type VariantType = "newOS" | "OSInProgess" | "default";

type StatusConfig = Record<
  OsStatus,
  {
    retangle: string;
    button: string;
    color: string;
    variant: VariantType;
    state?: string;
  }
>;

export function OsCard({ card, onStatusChange }: Props) {
  const statusConfig: StatusConfig = {
    new: {
      retangle: BlueRetangle,
      button: "Pendente",
      color: "bg-seinfra-blue-light-600-60",
      variant: "newOS",
      state: undefined,
    },
    inProgress: {
      retangle: YellowRetangle,
      button: "Em Execução",
      color: "bg-seinfra-yellow-500",
      variant: "OSInProgess",
      state: "Em execução",
    },
    completed: {
      retangle: GreenRetangle,
      button: "Finalizada",
      color: "bg-seinfra-green-500",
      variant: "default",
      state: "Finalizada",
    },
    canceled: {
      retangle: RedRetangle,
      button: "Cancelada",
      color: "bg-seinfra-red-500",
      variant: "default",
      state: "Cancelada",
    },
  };

  const currentStatus = statusConfig[card.status as OsStatus];

  const buttonElement = (
    <Button
      type="button"
      variant="link"
      className={`cursor-pointer absolute top-4 right-4 z-10 ${currentStatus.color} text-white px-4 py-1 w-fit! h-10! rounded-lg text-sm font-semibold hover:opacity-90 transition`}
    >
      {currentStatus.button}
    </Button>
  );

  return (
    <div className="bg-background shadow-md rounded-xl p-6 h-40 border border-gray-200 relative hover:shadow-lg transition flex flex-col justify-between">
      <img
        src={currentStatus.retangle}
        alt="Background Card"
        className="absolute left-0 top-1 z-0"
      />

      <OsDescDialog
        Trigger={buttonElement}
        Category={card.category}
        Address={card.address}
        Reference={card.reference}
        Problem={card.problem}
        RequestDate={card.dateRequest}
        RequestDateConcluded={card.dateRequestConcluded}
        State={currentStatus.state}
        CPF={formatCPF(card.users?.cpf || "")}
        Name={card.users?.name || ""}
        Number={formatPhone(card.users?.phone || "")}
        Variant={currentStatus.variant}
        IdOrder={card.id_order}
        onStatusChange={onStatusChange}
      />

      <div className="flex flex-col gap-1 flex-1">
        <h2 className="font-semibold text-gray-700 text-lg">
          Categoria: {card.category}
        </h2>
        <p className="text-gray-500 text-sm">Local: {card.address}</p>
        <p className="text-gray-500 text-sm">Problema: {card.problem}</p>

        <p className="text-gray-400 text-xs mt-1">
          Data da solicitação: {card.dateRequest}
        </p>
        {card.status === "completed" && card.dateRequestConcluded && (
          <p className="text-gray-400 text-xs mt-1">
            Data da conclusão da solicitação: {card.dateRequestConcluded}
          </p>
          )}
      </div>
    </div>
  );
}
