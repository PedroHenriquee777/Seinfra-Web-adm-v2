import ConectaSeinfraIcon from "@/assets/ConectaSeinfraLight.svg";
import LogoPrefeitura from "@/assets/LogoPrefeitura.svg";
import pinkLine from "@/assets/pinkLine.svg";
import yellowLine from "@/assets/yellowLine.svg";
import { MenuDialog } from "@/components/menu-dialog";
import NavButton from "@/components/nav-button";
import { navItems } from "@/lib/constants";

export function HomePage() {
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
          <div className="flex flex-col items-center justify-center gap-12">
            <div className="flex flex-wrap gap-12 justify-center items-center">
              {navItems.slice(0, 2).map((item) => (
                <NavButton key={item.Page} {...item} />
              ))}
            </div>
            <div className="flex sm:flex-row flex-col gap-12 justify-center items-center">
              {navItems.slice(2, 4).map((item) => (
                <NavButton key={item.Page} {...item} />
              ))}
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