import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import ClientProvider from "@/components/ClientProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  title: "Countries App",
  description: "En reseapp som visar information om länder",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="sv">
      <body>
        <div className="min-h-screen">
          <ClientProvider>
            <ErrorBoundary>
              <header className="bg-white border-b">
                <Navbar />
              </header>
              <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6">
                {children}
              </main>
            </ErrorBoundary>
          </ClientProvider>
        </div>
      </body>
    </html>
  );
}
