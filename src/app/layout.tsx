import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Providers from "@/context/Providers";
import Sidebar from "@/components/Sidebar";
import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";
import { config } from "@/config/Walletconnect";
import FaucetButton from "@/components/FaucetButton";
import FaucetGasButton from "@/components/FaucetGasButton";
import Footer from "@/components/Footer/Footer";

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
      <body className={`${inter.className} grid grid-rows-[auto_1fr_auto] relative min-h-screen overflow-x-hidden`}>
        <Providers initialState={initialState}>
          <Sidebar />
          {children}
          {/* <FaucetModal />  */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
