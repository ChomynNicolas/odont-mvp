// src/app/layout.tsx
import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "OdontoClub MVP",
};

export default function RootLayout({
  children,
  session, // pasado automáticamente por NextAuth si lo configuras
}: {
  children: React.ReactNode;
  session?: any;
}) {
  return (
    <html lang="es">
      <body className="flex h-screen">
        {/* Aquí usamos el Client Component */}
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
