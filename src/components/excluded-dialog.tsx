import { CircleX } from "lucide-react";
import pinkLine from "@/assets/pinkLine.svg";
import yellowLine from "@/assets/yellowLine.svg";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface ExcludedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExcludedDialog({ open, onOpenChange }: ExcludedDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-84 p-10 sm:max-w-md sm:h-90 sm:p-6 rounded-3xl border-transparent">
        <img
          src={pinkLine}
          alt="Linha Rosa Background"
          className="absolute left-2 -top-0.5 w-23 size-32 scale-x-120 sm:left-2.5 sm:-top-0.5 sm:w-32"
        />

        <div className="flex justify-center items-center flex-col text-center font-bold text-xl text-seinfra-blue-light-400">
          <CircleX size={100} />
          <h1>Ordem de serviço cancelada!</h1>
        </div>
        <img
          src={yellowLine}
          alt="Yellow Line"
          className="absolute right-3.5 -bottom-0.5 w-28 size-30 scale-x-125 sm:right-3.5 sm:-bottom-0.5 sm:w-30 sm:size-35"
        />
      </DialogContent>
    </Dialog>
  );
}
