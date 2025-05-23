import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomNavbar from "./components/CustomNavbar";
import { GlobalProvider } from "./context/GlobalContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Delta",
  description: "F1 Sim Racing Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black">
        <GlobalProvider>
          <CustomNavbar />
          <main className="p-6">{children}</main>
        </GlobalProvider>
      </body>
    </html>
  );
}
