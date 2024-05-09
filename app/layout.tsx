import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Natsuki's Portfolio",
  description: "Welcome to Natsuki's Portfolio. Here you'll find a showcase of my latest projects, including websites and apps I've developed and AI-generated artwork. Dive into my journey of creativity and innovation in technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html  lang="jp">
      <body className={cn(inter.className, 'min-h-dvh  ')} suppressHydrationWarning>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Header/>
        {children}
        <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}