import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Manual Operacional - Back Office EBCO",
  description: "Sistema de Back Office para gestión operacional",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col ml-64">
            <main className="flex-1 bg-brand-bg-light">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
