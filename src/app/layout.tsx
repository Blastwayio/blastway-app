import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Providers from "@/context/Providers";
import Sidebar from "@/components/Sidebar";
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";
import { config } from "@/config/Walletconnect";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blastway",
  description:
    "The next generation innovative lending protocol with yield earnings and ecosystem incubator built on Blast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers initialState={initialState}>
          <Sidebar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
