import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

// Crea el handler
const handler = NextAuth(authOptions);

// Exporta para App Router
export { handler as GET, handler as POST };
