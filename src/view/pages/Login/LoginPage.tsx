import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
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
import { login } from "@/services/auth";
import { adminLoginSchema } from "@/services/zodSchemas";
import { ErrorLoginDialog } from "@/components/error-login";
import { LoaderDialog } from "@/components/loader-dialog";
import { useState } from "react";
import { formatCPF } from "@/utils/format-cpf";

export function LoginPage() {
  const [openError, setOpenError] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  const form = useForm<z.infer<typeof adminLoginSchema>>({
    defaultValues: {
      cpf: "",
      password: "",
    },
    resolver: zodResolver(adminLoginSchema),
  });

  async function onSubmit(data: z.infer<typeof adminLoginSchema>) {
    try {
      setLoading(true)

      await login({
        cpf: data.cpf.replace(/\D/g, ""),
        password: data.password,
        });
        

      navigate({ to: "/", replace: true });
    } catch (error) {
       setOpenError(true)
    }  finally {
      setLoading(false)
    }
  }
  
  return (
    <div>
       <LoaderDialog 
      open={loading}
      />
      <ErrorLoginDialog 
      open={openError}
      onOpenChange={setOpenError}
      />
    <div className="relative flex justify-center items-center flex-col min-h-dvh h-auto font-semibold">
      <img
        src={pinkLine}
        alt="Linha Rosa Background"
        className="absolute left-0 -top-20 sm:-top-10"
      />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-8 flex-col"
      >
        <div className="text-center mt-20">
          <h1 className="text-5xl text-seinfra-blue-light-700 mb-8 px-4">
            Login Admin
          </h1>
          <p className="text-seinfra-blue-light-500 font-normal px-4">
            Informe seu CPF e senha para entrar na conta admin
          </p>
        </div>
        <FieldGroup>
          <Controller
            control={form.control}
            name="cpf"
            render={({ field, fieldState }) => (
              <Field orientation={"seinfra"} data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>CPF</FieldLabel>
                <Input {...field} id={field.name} inputMode="numeric" onChange={(e) => {
                  field.onChange(formatCPF(e.target.value))
                }} />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Field orientation={"seinfra"} data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Senha</FieldLabel>
                <PasswordInput {...field} id={field.name}></PasswordInput>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
                <Button className="mt-14">Entrar</Button>
              </Field>
            )}
          />
        </FieldGroup>
        <footer className="flex mt-4 text-center justify-center flex-col gap-8 items-center">
          <h1 className="text-seinfra-blue-light-500">
            Não tem uma conta? <br />
            <Link
              to="/register-admin"
              className="text-seinfra-yellow-500 hover:text-seinfra-yellow-600 underline"
            >
              Criar conta
            </Link>
          </h1>
          <div className="flex items-center justify-center mt-14 mb-14 gap-y-12 gap-x-10 sm:gap-x-24">
            <img src={ConectaSeinfraIcon} alt="Logo do Conecta Seinfra" />
            <img src={LogoPrefeitura} alt="Logo Prefeitura de Nova Russas" />
          </div>
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