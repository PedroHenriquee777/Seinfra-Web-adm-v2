import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface Props {
  Icon: LucideIcon;
  Page: string;
  Desc: string;
  Label: string;
  className?: string;
}

export default function NavButton({
  Icon,
  Page,
  Desc,
  Label,
  className,
}: Props) {
  return (
    <div>
      <Link to={Page}>
        <div
          className={cn(
            "bg-white rounded-3xl p-4 xl:p-8 shadow-xs font-semibold",
            "overflow-hidden flex flex-col justify-center gap-8 xl:gap-12",
            className,
          )}
        >
          <Icon className="shrink-0 text-seinfra-blue-light-600-60 mx-4 size-10 xl:size-14 2xl:size-18" />
          <div className="flex flex-col gap-1 xl:gap-4">
            <h2 className="text-lg xl:text-xl 2xl:text-2xl text-seinfra-blue-light-700-70 px-4">
              {Label}
            </h2>
            <p className="text-[0.625rem] xl:text-sm 2xl:text-md text-seinfra-blue-light-600 px-4">
              {Desc}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
