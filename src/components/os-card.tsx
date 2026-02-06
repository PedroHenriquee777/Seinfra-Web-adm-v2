import BlueRetangle from "@/assets/blueRetangle.svg";
import GreenRetangle from "@/assets/greenRetangle.svg";
import YellowRetangle from "@/assets/yellowRetangle.svg";
import { Button } from "@/components/ui/button";
import type { OsCard as OsCardType } from "@/lib/constants";
import { OsDescDialog } from "./os-desc-dialog";

interface Props {
  card: OsCardType;
  onStatusChange?: () => void;
}

export function OsCard({ card, onStatusChange }: Props) {
  const statusConfig = {
    new: {
      retangle: BlueRetangle,
      button: "Pendente",
      color: "bg-seinfra-blue-light-600-60",
      variant: "newOS" as const,
      state: undefined,
    },
    inProgress: {
      retangle: YellowRetangle,
      button: "Em Execução",
      color: "bg-seinfra-yellow-500",
      variant: "OSInProgess" as const,
      state: "Em execução",
    },
    completed: {
      retangle: GreenRetangle,
      button: "Finalizada",
      color: "bg-seinfra-green-500",
      variant: "default" as const,
      state: "Finalizada",
    },
  }[card.state];

  const buttonElement = (
    <Button
      type="button"
      variant="link"
     className={`cursor-pointer absolute top-4 right-4 z-10 ${statusConfig.color} text-white px-4 py-1 w-fit! h-10! rounded-lg text-sm font-semibold hover:opacity-90 transition`}
    >
      {statusConfig.button}
    </Button>
  );

  return (
    <div className="bg-background shadow-md rounded-xl p-6 h-40 border border-gray-200 relative hover:shadow-lg transition flex flex-col justify-between">
      <img
        src={statusConfig.retangle}
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
        ConclusionDate={card.dateRequestConcluded}
        State={statusConfig.state}
        CPF={card.applicant?.cpf || ""}
        Name={card.applicant?.name || ""}
        Number={card.applicant?.phone || ""}
        Variant={statusConfig.variant}
        IdOrder={card.id_order}
        onStatusChange={onStatusChange}
      />
      console.log(card);

      <div className="flex flex-col gap-1 flex-1">
        <h2 className="font-semibold text-gray-700 text-lg">
          Categoria: {card.category}
        </h2>
        <p className="text-gray-500 text-sm">Local: {card.address}</p>
        <p className="text-gray-500 text-sm">Problema: {card.problem}</p>

        <p className="text-gray-400 text-xs mt-1">
          Data da solicitação: {card.dateRequest}
        </p>
      </div>
    </div>
  );
}
