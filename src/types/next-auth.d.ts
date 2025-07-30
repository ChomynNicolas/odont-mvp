// 1. Importa los tipos base
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";
import { Role } from "@prisma/client"; // tu enum de Prisma

// 2. Extiende el módulo "next-auth"
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      // añade “role” además de name/email/image
      role: Role;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: Role;
  }
}

// 3. Extiende también el JWT para incluir role en el token
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role?: Role;
  }
}

