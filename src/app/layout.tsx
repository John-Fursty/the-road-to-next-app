import "./globals.css";
import type { Metadata } from "next";
import { EB_Garamond, Figtree, Geist, Geist_Mono, Noto_Sans, Playfair_Display, Public_Sans } from "next/font/google";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";

const geistHeading = Geist({subsets:['latin'],variable:'--font-heading'});

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const ebGaramond = EB_Garamond({subsets:['latin'],variable:'--font-serif'});

const geistSans = Geist({ 
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Road Next",
  description: "My Road to Next application ...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, ebGaramond.variable, "font-sans", geist.variable, geistHeading.variable)}
    >

      <body className="">
        <ThemeProvider>
          <Header />

          <main className="min-h-screen flex-1 overflow-y-auto overflow-x-hidden py-24 px-8 bg-secondary/20 flex flex-col">{children}</main>
        </ThemeProvider>      
      </body>
    </html>
  );
}
