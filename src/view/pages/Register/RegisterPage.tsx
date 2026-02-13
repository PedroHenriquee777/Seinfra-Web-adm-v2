import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeftIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
import ConectaSeinfraIcon from "@/assets/ConectaSeinfra.svg";
import LogoPrefeitura from "@/assets/LogoPrefeitura.svg";
import pinkLine from "@/assets/pinkLine.svg";
import yellowLine from "@/assets/yellowLine.svg";
import PasswordInput from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { adminRegisterSchema } from "@/services/zodSchemas";
import { registerAdmin } from "@/services/auth";
import { CreatedRegisterDialog } from "@/components/created-register";
import { ErrorRegisterDialog } from "@/components/error-register";
import { LoaderDialog } from "@/components/loader-dialog";
import { formatCPF } from "@/utils/format-cpf";
import { formatPhone } from "@/utils/format-phone";

export function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
	const [openError, setOpenError] = useState(false);
	const [successOpen, setSuccessOpen] = useState(false)

  const form = useForm<z.infer<typeof adminRegisterSchema>>({
    defaultValues: {
      cpf: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(adminRegisterSchema),
  });

  async function onSubmit(data: z.infer<typeof adminRegisterSchema>) {
    try {
      setLoading(true);

      if (step === 1) {
        await registerAdmin({
          cpf: data.cpf.replace(/\D/g, ""),
          password: data.password,
          phone: data.phone,
        });

        setSuccessOpen(true)
        
        navigate({ to: "/login-admin", replace: true });
      }
    } catch (error: any) {
      setOpenError(true);
    } finally {
			setLoading(false);
		}
  }

  return (
    <div>
      <LoaderDialog open={loading} />
			<ErrorRegisterDialog open={openError} onOpenChange={setOpenError} />
			<CreatedRegisterDialog	open={successOpen} onOpenChange={setSuccessOpen} />

    <div className="relative flex justify-center items-center flex-col min-h-dvh h-auto font-semibold">
      <img
        src={pinkLine}
        alt="Linha Rosa Background"
        className="absolute left-0 -top-20 sm:-top-10"
      />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-8 justify-center items-center flex-col"
      >
        <div className="flex flex-col gap-8 text-center mt-20 w-screen">
          <Link to="/login-admin" className="z-1 hover:cursor-pointer lg:hidden">
            <ChevronLeftIcon className="text-seinfra-yellow-400 mx-2 sm:mx-4 size-8" />
          </Link>
          <div className="flex flex-col gap-8">
            <h1 className="text-5xl text-seinfra-blue-light-700 px-4">
              Criar conta
            </h1>
            <p className="text-seinfra-blue-light-500 font-normal px-4">
              Preencha as informações obrigatórias para criar a sua conta
            </p>
          </div>
        </div>
        {step === 0 && (
          <FieldGroup>
            <Controller
              control={form.control}
              name="phone"
              render={({ field, fieldState }) => (
                <Field
                  orientation={"seinfra"}
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel htmlFor={field.name}>Telefone</FieldLabel>
                  <Input {...field} id={field.name} inputMode="numeric" onChange={(e) => {
                    field.onChange(formatPhone(e.target.value))
                  }} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="cpf"
              render={({ field, fieldState }) => (
                <Field
                  orientation={"seinfra"}
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel htmlFor={field.name}>CPF</FieldLabel>
                  <Input
											{...field}
											id={field.name}
											inputMode="numeric"
											onChange={(e) => {
												field.onChange(formatCPF(e.target.value));
											}}
										/>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <Button
                    className="px-4 py-3 mt-14 rounded-3xl"
                    onClick={async () => {
                      const ok = await form.trigger(["phone", "cpf"]);
                      if (ok) setStep(1);
                    }}
                  >
                    Continuar
                  </Button>
                </Field>
              )}
            />
          </FieldGroup>
        )}
        {step === 1 && (
          <FieldGroup>
            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <Field
                  orientation={"seinfra"}
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel htmlFor={field.name}>Senha</FieldLabel>
                  <PasswordInput {...field} id={field.name} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="confirmPassword"
              render={({ field, fieldState }) => (
                <Field
                  orientation={"seinfra"}
                  data-invalid={fieldState.invalid}
                >
                  <FieldLabel htmlFor={field.name}>Confirmar senha</FieldLabel>
                  <PasswordInput {...field} id={field.name} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <Button type="submit" className="px-4 py-3 mt-14 rounded-3xl">
                    Continuar
                  </Button>
                </Field>
              )}
            />
          </FieldGroup>
        )}
        <footer className="flex items-center justify-center mt-14 mb-14 gap-y-12 gap-x-10 sm:gap-x-24">
          <img src={ConectaSeinfraIcon} alt="Logo do Conecta Seinfra" />
          <img src={LogoPrefeitura} alt="Logo Prefeitura de Nova Russas" />
        </footer>
        <img
          src={yellowLine}
          alt="Yellow Line"
          className="absolute -right-4 sm:right-0 -bottom-10"
        />
      </form>
    </div>
    </div>
  );
}