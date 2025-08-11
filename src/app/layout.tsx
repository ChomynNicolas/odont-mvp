// src/app/layout.tsx
import "./globals.css";
import { Providers } from "./providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { SidebarProvider } from "@/components/ui/sidebar";
import { Navbar } from "@/components/layout/navbar";
import { SidebarElement } from "@/components/layout/SideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dental Practice Management",
  description: "Complete dental practice management system",
};

export default function RootLayout({
  children,
  session, // pasado automáticamente por NextAuth si lo configuras
}: {
  children: React.ReactNode;
  session?: any;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <SidebarElement />
              <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 p-6 bg-gray-50/50">{children}</main>
              </div>
            </div>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
