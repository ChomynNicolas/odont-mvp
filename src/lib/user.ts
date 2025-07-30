import { z } from "zod";

export const RegisterUserSchema = z.object({
  email: z.string().email({ message: "Correo inválido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  role: z.enum(["ADMIN", "ODONT", "RECEP"], {
    errorMap: () => ({ message: "Rol inválido — debe ser ADMIN, ODONT o RECEP" }),
  }),
});
export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;

