"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginSchema = z.object({
  email: z.string().email({ message: "Correo inválido" }),
  password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
});
type LoginData = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
  });

  async function onSubmit(data: LoginData) {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/patients",
    });
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm p-8 bg-white rounded-lg shadow"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Iniciar Sesión
        </h1>

        <label className="block mb-2">Correo electrónico</label>
        <Input {...register("email")} placeholder="correo@ejemplo.com" />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}

        <label className="block mt-4 mb-2">Contraseña</label>
        <Input
          {...register("password")}
          type="password"
          placeholder="********"
        />
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-full mt-6">
          {isSubmitting ? "Cargando..." : "Entrar"}
        </Button>
      </form>
    </div>
  );
}
