import { z } from "zod";

export const userLoginSchema = z.object({
  cpf: z
    .string()
    .max(14, { message: "CPF invalido" })
    .min(1, { message: "O campo precisa ser preenchido" })
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: "CPF inválido" }),
  password: z
    .string()
    .min(8, { message: "A senha deve conter no mínimo 8 caracteres" }),
});

export const adminLoginSchema = z.object({
  cpf: z
    .string()
    .max(14, { message: "CPF invalido" })
    .min(1, { message: "O campo precisa ser preenchido" })
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: "CPF inválido" }),
  senha: z
    .string()
    .min(8, { message: "A senha deve conter no mínimo 8 caracteres" }),
});
export const registerSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "A senha deve conter no mínimo 8 caracteres" }),
    confirmPassword: z.string(),
    name: z.string().min(1, { message: "O campo deve ser preenchido" }),
    phone: z
      .string()
      .regex(/^[0-9]{2}\s[0-9]{5}-[0-9]{4}$/, { message: "Numero invalido" }),
    cpf: z
      .string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: "CPF inválido" }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas devem ser iguais",
        path: ["confirmPassword"],
      });
    }
  });

export const adminRegisterSchema = z
  .object({
    senha: z
      .string()
      .min(8, { message: "A senha deve conter no mínimo 8 caracteres" }),
    confirmPassword: z.string(),
    telefone: z
      .string()
      .regex(/^[0-9]{2}\s[0-9]{5}-[0-9]{4}$/, { message: "Numero invalido" }),
    cpf: z
      .string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: "CPF inválido" }),
  })
  .superRefine(({ confirmPassword, senha }, ctx) => {
    if (confirmPassword !== senha) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas devem ser iguais",
        path: ["confirmPassword"],
      });
    }
  });