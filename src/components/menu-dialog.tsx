import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function MenuDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Menu className="absolute right-0 size-10 text-seinfra-blue-light-400 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md sm:h-60 rounded-3xl border-transparent p-6">
        <DialogHeader>
          <DialogTitle className="flex justify-center font-bold text-seinfra-blue-light-400">
            Menu
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-4 sm:gap-10 mt-4">
          <Button
            type="button"
            variant="link"
            className="bg-seinfra-blue-light-600 w-full sm:w-42! text-xl rounded-2xl font-semibold text-background"
          >
            Colaboradores
          </Button>
          <Link to="/filter-reports">
            <Button
              type="button"
              variant="link"
              className="bg-seinfra-blue-light-600 w-full sm:w-40! text-xl rounded-2xl font-semibold text-background"
            >
              Relatório
            </Button>
          </Link>
        </div>
        <DialogFooter className="sm:justify-center mt-6">
          <DialogClose asChild>
            <Link to="/login-admin">
              <Button
                type="button"
                variant="link"
                className="bg-seinfra-blue-light-300 w-full sm:w-40! h-12! text-xl rounded-2xl font-semibold text-background"
              >
                Sair
              </Button>
            </Link>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
