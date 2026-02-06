import { useEffect, useState } from "react";
import ConectaSeinfraIcon from "@/assets/ConectaSeinfraLight.svg";
import LogoPrefeitura from "@/assets/LogoPrefeitura.svg";
import pinkLine from "@/assets/pinkLine.svg";
import yellowLine from "@/assets/yellowLine.svg";
import { MenuDialog } from "@/components/menu-dialog";
import { OsCard } from "@/components/os-card";
import { TitleHeader } from "@/components/title-header";
import { requestOrders } from "@/services/orders";
import { mapOrderToOsCard } from "@/lib/utils";

export function AllOsPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await requestOrders("recente");
        const mappedOrders = response.data.map(mapOrderToOsCard);
        setOrders(mappedOrders);
      } catch (error) {
        console.error("Erro ao buscar todas as O.S:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="relative flex flex-col min-h-dvh h-auto overflow-hidden">
      <img
        src={pinkLine}
        alt="Linha Rosa Background"
        className="absolute left-0 top-0 z-0"
      />

      <main className="h-full w-full flex bg-gray-100 justify-center">
        <div className="flex flex-col items-center gap-12 w-full max-w-7xl relative z-10">
          <div className="relative w-full flex justify-center items-center">
            <img
              src={ConectaSeinfraIcon}
              alt="Logo do Conecta Seinfra"
              className="size-44 sm:size-58 lg:size-60"
            />
            <MenuDialog />
          </div>
          <TitleHeader title="Todas as O.S" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 gap-x-10 w-full px-4">
            {orders.map((card, i) => (
              <OsCard key={i} card={card} />
            ))}
          </div>

          <img
            src={LogoPrefeitura}
            alt="Logo da Prefeitura"
            className="size-54 sm:size-64 lg:size-74"
          />
        </div>
        <img
          src={yellowLine}
          alt="Yellow Line"
          className="absolute -right-1 sm:right-0 bottom-0"
        />
      </main>
    </div>
  );
}