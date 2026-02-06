import ConectaSeinfraIcon from "@/assets/ConectaSeinfraLight.svg";
import LogoPrefeitura from "@/assets/LogoPrefeitura.svg";
import pinkLine from "@/assets/pinkLine.svg";
import yellowLine from "@/assets/yellowLine.svg";
import { MenuDialog } from "@/components/menu-dialog";
import { TitleHeader } from "@/components/title-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FilterReportsPage() {
  return (
    <div className="relative flex flex-col min-h-dvh h-auto overflow-hidden">
      <img
        src={pinkLine}
        alt="Linha Rosa Background"
        className="absolute left-0 top-0 z-0"
      />
      <main className="h-full w-full flex bg-gray-100 justify-center items-center">
        <div className="flex flex-col items-center justify-center gap-12">
          <div className="relative w-full flex justify-center items-center">
            <img
              src={ConectaSeinfraIcon}
              alt="Logo do Conecta Seinfra"
              className="size-44 sm:size-58 lg:size-60"
            />
            <MenuDialog />
          </div>
          <TitleHeader title="Relatório" />
          <div className="flex items-center justify-center gap-12">
            <div className="flex gap-12 justify-center items-center">
              <div className="bg-background justify-center items-center shadow-md rounded-4xl p-6 w-220 h-120 border border-gray-200 relative hover:shadow-lg transition flex flex-col">
                <div className="flex flex-col gap-1 flex-1">
                  <h1>Selecione o Período para gerar Relatório</h1>
                  <div className="flex justify-center py-20 gap-20">
                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor="startDate"
                        className="text-seinfra-blue-light-400 font-semibold"
                      >
                        Do dia:
                      </Label>
                      {/** biome-ignore lint/correctness/useUniqueElementIds: <explanation> */}
                      <Input
                        type="date"
                        id="startDate"
                        className="w-60! h-13! text-2xl"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor="endDate"
                        className="text-seinfra-blue-light-400 font-semibold"
                      >
                        Até o dia:
                      </Label>
                      {/** biome-ignore lint/correctness/useUniqueElementIds: <explanation> */}
                      <Input
                        type="date"
                        id="endDate"
                        className="w-60! h-13! text-2xl"
                      />
                    </div>
                  </div>
                </div>
                <Button
                  type="button"
                  className="bg-seinfra-blue-light-300 w-full rounded-full h-20 text-2xl font-bold text-background"
                >
                  Download
                </Button>
              </div>
            </div>
          </div>
          <img
            src={LogoPrefeitura}
            alt="Logo do Conecta Seinfra"
            className="size-54 sm:size-64 lg:size-74"
          />
          <div>
            <img
              src={yellowLine}
              alt="Yellow Line"
              className="absolute -right-2 sm:right-0 bottom-0"
            />
          </div>
        </div>
      </main>
    </div>
  );
}