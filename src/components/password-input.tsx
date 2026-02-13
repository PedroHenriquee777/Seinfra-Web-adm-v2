import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeClosedIcon } from "lucide-react";

export default function PasswordInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  const [isVisible, setIsVisible] = useState(false);
  const Icon = isVisible ? EyeClosedIcon : EyeIcon;

  return (
    <div className="relative max-w-component-max-w">
      <Input
        className={cn("pr-9", className)}
        {...props}
        type={isVisible ? "text" : "password"}
      />
      <button
        type="button"
        onClick={() => setIsVisible((prev) => !prev)}
        className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
      >
        <Icon className="size-5 text-seinfra-blue-light-300 transition:150 hover:text-seinfra-blue-light-400" />
      </button>
    </div>
  );
}
