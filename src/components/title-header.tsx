import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
}

export function TitleHeader({ title }: PageHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-12 w-full max-w-7xl relative z-10">
      <div className="w-full flex items-center gap-4 px-4">
        <Link to="/">
          <ChevronLeft className="size-9 text-seinfra-yellow-500 cursor-pointer" />
        </Link>

        <h1 className="text-seinfra-blue-light-600-60 font-bold text-3xl">
          {title}
        </h1>
      </div>
    </div>
  );
}
