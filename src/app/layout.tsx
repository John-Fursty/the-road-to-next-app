import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono, EB_Garamond, Noto_Sans, Playfair_Display } from "next/font/google";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button"
import { homePath, ticketsPath } from "@/paths"
import { LucideKanban } from "lucide-react";
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
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, ebGaramond.variable, "font-sans", geist.variable, geistHeading.variable)}
    >

      <body className="">
        <nav className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur w-full flex py-2.5 px-5 justify-between">
          <div>
            <Button asChild variant="ghost" >
              <Link href={homePath()}>
                <LucideKanban />
                <h1 className="ml-2 text-lg font-semibold">TicketBounty</h1>
              </Link>
            </Button> 
          </div> 
          <div>
            <Button asChild variant="outline" >
              <Link href={ticketsPath()}>Tickets</Link>
            </Button>
          </div> 
        </nav>

        <main className="min-h-screen flex-1 overflow-y-auto overflow-x-hidden py-24 px-8 bg-secondary/20 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
